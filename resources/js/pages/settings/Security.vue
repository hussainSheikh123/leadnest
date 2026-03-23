<script setup lang="ts">
import { Form, Head } from '@inertiajs/vue3';
import { ShieldCheck } from 'lucide-vue-next';
import { onUnmounted, ref } from 'vue';
import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
import Heading from '@/components/Heading.vue';
import InputError from '@/components/InputError.vue';
import PasswordInput from '@/components/PasswordInput.vue';
import TwoFactorRecoveryCodes from '@/components/TwoFactorRecoveryCodes.vue';
import TwoFactorSetupModal from '@/components/TwoFactorSetupModal.vue';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { disable, enable } from '@/routes/two-factor';

type Props = {
    canManageTwoFactor?: boolean;
    requiresConfirmation?: boolean;
    twoFactorEnabled?: boolean;
};

withDefaults(defineProps<Props>(), {
    canManageTwoFactor: false,
    requiresConfirmation: false,
    twoFactorEnabled: false,
});

const { hasSetupData, clearTwoFactorAuthData } = useTwoFactorAuth();
const showSetupModal = ref<boolean>(false);

onUnmounted(() => clearTwoFactorAuthData());
</script>

<template>
    <Head title="Security settings" />

    <h1 class="sr-only">Security settings</h1>

    <SettingsLayout>
        <section
            class="rounded-[34px] border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_rgba(24,24,27,0.05)] sm:p-8"
        >
            <div class="max-w-3xl space-y-6">
                <Heading
                    variant="small"
                    title="Update password"
                    description="Ensure your account is using a long, random password to stay secure"
                />

                <Form
                    v-bind="SecurityController.update.form()"
                    :options="{
                        preserveScroll: true,
                    }"
                    reset-on-success
                    :reset-on-error="[
                        'password',
                        'password_confirmation',
                        'current_password',
                    ]"
                    class="space-y-6"
                    v-slot="{ errors, processing, recentlySuccessful }"
                >
                    <div class="grid gap-2">
                        <Label for="current_password">Current password</Label>
                        <PasswordInput
                            id="current_password"
                            name="current_password"
                            class="mt-1 block h-12 w-full rounded-2xl border-zinc-200 bg-[#faf9f6]"
                            autocomplete="current-password"
                            placeholder="Current password"
                        />
                        <InputError :message="errors.current_password" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="password">New password</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            class="mt-1 block h-12 w-full rounded-2xl border-zinc-200 bg-[#faf9f6]"
                            autocomplete="new-password"
                            placeholder="New password"
                        />
                        <InputError :message="errors.password" />
                    </div>

                    <div class="grid gap-2">
                        <Label for="password_confirmation"
                            >Confirm password</Label
                        >
                        <PasswordInput
                            id="password_confirmation"
                            name="password_confirmation"
                            class="mt-1 block h-12 w-full rounded-2xl border-zinc-200 bg-[#faf9f6]"
                            autocomplete="new-password"
                            placeholder="Confirm password"
                        />
                        <InputError :message="errors.password_confirmation" />
                    </div>

                    <div class="flex items-center gap-4">
                        <Button
                            :disabled="processing"
                            class="cursor-pointer rounded-2xl bg-zinc-950 px-5 text-white hover:bg-black"
                            data-test="update-password-button"
                        >
                            Save password
                        </Button>

                        <Transition
                            enter-active-class="transition ease-in-out"
                            enter-from-class="opacity-0"
                            leave-active-class="transition ease-in-out"
                            leave-to-class="opacity-0"
                        >
                            <p
                                v-show="recentlySuccessful"
                                class="text-sm text-neutral-600"
                            >
                                Saved.
                            </p>
                        </Transition>
                    </div>
                </Form>
            </div>
        </section>

        <section
            v-if="canManageTwoFactor"
            class="rounded-[34px] border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_rgba(24,24,27,0.05)] sm:p-8"
        >
            <div class="max-w-3xl space-y-6">
                <Heading
                    variant="small"
                    title="Two-factor authentication"
                    description="Manage your two-factor authentication settings"
                />

                <div
                    v-if="!twoFactorEnabled"
                    class="flex flex-col items-start justify-start space-y-4 rounded-[28px] border border-zinc-200 bg-[#faf9f6] p-5"
                >
                    <p class="text-sm text-muted-foreground">
                        When you enable two-factor authentication, you will be
                        prompted for a secure pin during login. This pin can be
                        retrieved from a TOTP-supported application on your
                        phone.
                    </p>

                    <div>
                        <Button
                            v-if="hasSetupData"
                            @click="showSetupModal = true"
                            class="cursor-pointer rounded-2xl bg-zinc-950 px-5 text-white hover:bg-black"
                        >
                            <ShieldCheck />Continue setup
                        </Button>
                        <Form
                            v-else
                            v-bind="enable.form()"
                            @success="showSetupModal = true"
                            #default="{ processing }"
                        >
                            <Button
                                type="submit"
                                :disabled="processing"
                                class="cursor-pointer rounded-2xl bg-zinc-950 px-5 text-white hover:bg-black"
                            >
                                Enable 2FA
                            </Button>
                        </Form>
                    </div>
                </div>

                <div
                    v-else
                    class="flex flex-col items-start justify-start space-y-4 rounded-[28px] border border-zinc-200 bg-[#faf9f6] p-5"
                >
                    <p class="text-sm text-muted-foreground">
                        You will be prompted for a secure, random pin during
                        login, which you can retrieve from the TOTP-supported
                        application on your phone.
                    </p>

                    <div class="relative inline">
                        <Form v-bind="disable.form()" #default="{ processing }">
                            <Button
                                variant="destructive"
                                type="submit"
                                :disabled="processing"
                                class="cursor-pointer rounded-2xl"
                            >
                                Disable 2FA
                            </Button>
                        </Form>
                    </div>

                    <TwoFactorRecoveryCodes />
                </div>

                <TwoFactorSetupModal
                    v-model:isOpen="showSetupModal"
                    :requiresConfirmation="requiresConfirmation"
                    :twoFactorEnabled="twoFactorEnabled"
                />
            </div>
        </section>
    </SettingsLayout>
</template>

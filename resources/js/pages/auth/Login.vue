<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { home, register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

defineProps<{
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}>();

const showPassword = ref(false);
</script>

<template>
    <PublicLayout>
        <Head title="Log in" />

        <div
            class="min-h-screen bg-[#faf9f6] px-4 py-6 text-zinc-950 sm:px-6 lg:px-8"
        >
            <div class="mx-auto flex max-w-[1180px] flex-col">
                <div class="flex justify-center py-2">
                    <Link :href="home()" class="inline-flex items-center gap-3">
                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white"
                        >
                            LN
                        </div>
                        <div
                            class="text-2xl font-semibold tracking-tight text-zinc-950"
                        >
                            LeadNest
                        </div>
                    </Link>
                </div>

                <div
                    class="mt-4 overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-[0_20px_70px_rgba(24,24,27,0.05)]"
                >
                    <div
                        class="grid min-h-[680px] lg:grid-cols-[0.95fr_1.05fr]"
                    >
                        <section
                            class="flex flex-col justify-between px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-16"
                        >
                            <div
                                class="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center"
                            >
                                <button
                                    type="button"
                                    class="inline-flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-white text-sm font-medium text-zinc-950 transition hover:border-zinc-950"
                                >
                                    <svg
                                        class="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fill="#EA4335"
                                            d="M12.24 10.285V14.4h5.88c-.255 1.35-1.53 3.96-5.88 3.96-3.54 0-6.42-2.925-6.42-6.54s2.88-6.54 6.42-6.54c2.01 0 3.36.855 4.125 1.59l2.82-2.73C17.385 2.46 15.045 1.5 12.24 1.5 6.99 1.5 2.73 5.76 2.73 11.01s4.26 9.51 9.51 9.51c5.49 0 9.12-3.855 9.12-9.285 0-.63-.075-1.11-.165-1.59H12.24Z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M2.73 11.01c0 1.695.405 3.3 1.125 4.725l3.69-2.865c-.195-.585-.3-1.215-.3-1.86s.105-1.275.3-1.86L3.855 6.285A9.418 9.418 0 0 0 2.73 11.01Z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M12.24 20.52c2.805 0 5.16-.93 6.885-2.52l-3.345-2.595c-.9.63-2.055 1.005-3.54 1.005-3.435 0-6.345-2.325-7.38-5.46l-3.72 2.865c1.71 3.405 5.235 5.705 9.6 5.705Z"
                                        />
                                        <path
                                            fill="#4285F4"
                                            d="M19.125 18c1.98-1.83 3.225-4.53 3.225-7.77 0-.63-.075-1.11-.165-1.59H12.24V12.6h5.88c-.285 1.44-1.14 2.655-2.34 3.495L19.125 18Z"
                                        />
                                    </svg>
                                    <span>Sign in with Google</span>
                                </button>

                                <div class="my-7 border-t border-zinc-200" />

                                <div
                                    v-if="status"
                                    class="mb-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-950"
                                >
                                    {{ status }}
                                </div>

                                <Form
                                    v-bind="store.form()"
                                    :reset-on-success="['password']"
                                    v-slot="{ errors, processing }"
                                    class="space-y-4"
                                >
                                    <div class="space-y-2">
                                        <Label
                                            for="email"
                                            class="text-sm font-medium text-zinc-950"
                                        >
                                            Email address
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            required
                                            autofocus
                                            :tabindex="1"
                                            autocomplete="email"
                                            placeholder="Enter your work email address"
                                            class="h-12 rounded-2xl border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-0"
                                        />
                                        <InputError :message="errors.email" />
                                    </div>

                                    <div class="space-y-2">
                                        <div
                                            class="flex items-center justify-between gap-4"
                                        >
                                            <Label
                                                for="password"
                                                class="text-sm font-medium text-zinc-950"
                                            >
                                                Password
                                            </Label>
                                            <Link
                                                v-if="canResetPassword"
                                                :href="request()"
                                                class="text-sm font-medium text-zinc-700 underline underline-offset-4"
                                                :tabindex="5"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>
                                        <div class="relative">
                                            <Input
                                                id="password"
                                                name="password"
                                                :type="
                                                    showPassword
                                                        ? 'text'
                                                        : 'password'
                                                "
                                                required
                                                :tabindex="2"
                                                autocomplete="current-password"
                                                placeholder="Enter your password"
                                                class="h-12 rounded-2xl border-zinc-200 bg-white pr-14 text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-0"
                                            />
                                            <button
                                                type="button"
                                                @click="
                                                    showPassword = !showPassword
                                                "
                                                class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-sm font-medium text-zinc-500 transition hover:text-zinc-950"
                                                tabindex="-1"
                                            >
                                                {{
                                                    showPassword
                                                        ? 'Hide'
                                                        : 'Show'
                                                }}
                                            </button>
                                        </div>
                                        <InputError
                                            :message="errors.password"
                                        />
                                    </div>

                                    <div
                                        class="flex items-center justify-between gap-4 pt-1"
                                    >
                                        <Label
                                            for="remember"
                                            class="flex items-center gap-3 text-sm font-medium text-zinc-700"
                                        >
                                            <Checkbox
                                                id="remember"
                                                name="remember"
                                                :tabindex="3"
                                                class="border-zinc-950 data-[state=checked]:border-zinc-950 data-[state=checked]:bg-zinc-950"
                                            />
                                            <span>Remember me</span>
                                        </Label>
                                    </div>

                                    <button
                                        type="submit"
                                        class="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                                        :tabindex="4"
                                        :disabled="processing"
                                        data-test="login-button"
                                    >
                                        <Spinner v-if="processing" />
                                        <span v-else>Continue</span>
                                    </button>

                                    <div
                                        v-if="canRegister"
                                        class="pt-2 text-center text-sm text-zinc-600"
                                    >
                                        Do not have an account?
                                        <Link
                                            :href="register()"
                                            class="ml-1 font-semibold text-zinc-950 underline underline-offset-4"
                                            :tabindex="5"
                                        >
                                            Sign up
                                        </Link>
                                    </div>
                                </Form>
                            </div>

                            <p
                                class="mx-auto mt-10 max-w-[380px] text-xs leading-6 text-zinc-500"
                            >
                                By continuing, you agree to the platform terms
                                and privacy policy.
                            </p>
                        </section>

                        <section
                            class="hidden border-l border-zinc-200 px-10 py-12 lg:flex lg:items-center lg:px-16"
                        >
                            <div class="max-w-[430px]">
                                <h1
                                    class="text-5xl font-semibold tracking-tight text-zinc-950"
                                >
                                    Welcome back.
                                </h1>
                                <div
                                    class="mt-8 space-y-6 text-lg leading-8 text-zinc-600"
                                >
                                    <p>
                                        LeadNest keeps your lead workflow clean,
                                        quick to scan, and easier to trust.
                                    </p>
                                    <p>
                                        Review qualified accounts, keep outreach
                                        organized, and move the right records
                                        into action without extra noise.
                                    </p>
                                    <p class="font-medium text-zinc-900">
                                        Let&apos;s begin.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </PublicLayout>
</template>

<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import { ref } from 'vue';
import InputError from '@/components/InputError.vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { home, login } from '@/routes';
import { store } from '@/routes/register';

const showPassword = ref(false);
const showConfirmPassword = ref(false);
</script>

<template>
    <PublicLayout>
        <Head title="Register" />

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
                                    <span>Sign up with Google</span>
                                </button>

                                <div class="my-7 border-t border-zinc-200" />

                                <Form
                                    v-bind="store.form()"
                                    :reset-on-success="[
                                        'password',
                                        'password_confirmation',
                                    ]"
                                    v-slot="{ errors, processing }"
                                    class="space-y-4"
                                >
                                    <div class="space-y-2">
                                        <Label
                                            for="name"
                                            class="text-sm font-medium text-zinc-950"
                                        >
                                            Full name
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autofocus
                                            :tabindex="1"
                                            autocomplete="name"
                                            name="name"
                                            placeholder="Enter your full name"
                                            class="h-12 rounded-2xl border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-0"
                                        />
                                        <InputError :message="errors.name" />
                                    </div>

                                    <div class="space-y-2">
                                        <Label
                                            for="phone"
                                            class="text-sm font-medium text-zinc-950"
                                        >
                                            Phone number
                                        </Label>
                                        <div
                                            class="grid grid-cols-[120px_1fr] gap-3"
                                        >
                                            <select
                                                id="phone_country_code"
                                                name="phone_country_code"
                                                required
                                                :tabindex="2"
                                                class="h-12 rounded-2xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 outline-none focus:border-zinc-950"
                                            >
                                                <option value="+971">
                                                    +971
                                                </option>
                                                <option value="+966">
                                                    +966
                                                </option>
                                                <option value="+973">
                                                    +973
                                                </option>
                                                <option value="+974">
                                                    +974
                                                </option>
                                                <option value="+965">
                                                    +965
                                                </option>
                                            </select>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                required
                                                :tabindex="3"
                                                autocomplete="tel-national"
                                                name="phone"
                                                placeholder="50 123 4567"
                                                class="h-12 rounded-2xl border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-0"
                                            />
                                        </div>
                                    </div>

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
                                            required
                                            :tabindex="4"
                                            autocomplete="email"
                                            name="email"
                                            placeholder="Enter your work email address"
                                            class="h-12 rounded-2xl border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-0"
                                        />
                                        <InputError :message="errors.email" />
                                    </div>

                                    <div class="space-y-2">
                                        <Label
                                            for="password"
                                            class="text-sm font-medium text-zinc-950"
                                        >
                                            Password
                                        </Label>
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
                                                :tabindex="5"
                                                autocomplete="new-password"
                                                placeholder="Create a password"
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

                                    <div class="space-y-2">
                                        <Label
                                            for="password_confirmation"
                                            class="text-sm font-medium text-zinc-950"
                                        >
                                            Confirm password
                                        </Label>
                                        <div class="relative">
                                            <Input
                                                id="password_confirmation"
                                                name="password_confirmation"
                                                :type="
                                                    showConfirmPassword
                                                        ? 'text'
                                                        : 'password'
                                                "
                                                required
                                                :tabindex="6"
                                                autocomplete="new-password"
                                                placeholder="Confirm your password"
                                                class="h-12 rounded-2xl border-zinc-200 bg-white pr-14 text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-0"
                                            />
                                            <button
                                                type="button"
                                                @click="
                                                    showConfirmPassword =
                                                        !showConfirmPassword
                                                "
                                                class="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-4 text-sm font-medium text-zinc-500 transition hover:text-zinc-950"
                                                tabindex="-1"
                                            >
                                                {{
                                                    showConfirmPassword
                                                        ? 'Hide'
                                                        : 'Show'
                                                }}
                                            </button>
                                        </div>
                                        <InputError
                                            :message="
                                                errors.password_confirmation
                                            "
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        class="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                                        tabindex="7"
                                        :disabled="processing"
                                        data-test="register-user-button"
                                    >
                                        <Spinner v-if="processing" />
                                        <span v-else>Create account</span>
                                    </button>

                                    <div
                                        class="pt-2 text-center text-sm text-zinc-600"
                                    >
                                        Already have an account?
                                        <Link
                                            :href="login()"
                                            class="ml-1 cursor-pointer font-semibold text-zinc-950 underline underline-offset-4"
                                            :tabindex="8"
                                        >
                                            Log in
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
                                    Build your workspace.
                                </h1>
                                <div
                                    class="mt-8 space-y-6 text-lg leading-8 text-zinc-600"
                                >
                                    <p>
                                        LeadNest helps teams organize lead
                                        generation with a cleaner front end and
                                        more focused account review.
                                    </p>
                                    <p>
                                        Create your account, invite your team
                                        later, and keep your workflow simple
                                        from day one.
                                    </p>
                                    <p class="font-medium text-zinc-900">
                                        Start here.
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

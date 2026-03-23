<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import InputError from '@/components/InputError.vue';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { home, login } from '@/routes';
import { email } from '@/routes/password';

defineProps<{
    status?: string;
}>();
</script>

<template>
    <PublicLayout>
        <Head title="Forgot password" />

        <div
            class="min-h-screen bg-[#faf9f6] px-4 py-6 text-zinc-950 sm:px-6 lg:px-8"
        >
            <div class="mx-auto flex max-w-[1080px] flex-col">
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
                        class="grid min-h-[560px] lg:grid-cols-[0.94fr_1.06fr]"
                    >
                        <section
                            class="flex flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-16 lg:py-16"
                        >
                            <div class="mx-auto w-full max-w-[380px]">
                                <div
                                    v-if="status"
                                    class="mb-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm font-medium text-zinc-950"
                                >
                                    {{ status }}
                                </div>

                                <Form
                                    v-bind="email.form()"
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
                                            autocomplete="off"
                                            autofocus
                                            placeholder="Enter your work email address"
                                            class="h-12 rounded-2xl border-zinc-200 bg-white text-zinc-950 placeholder:text-zinc-400 focus-visible:border-zinc-950 focus-visible:ring-0"
                                        />
                                        <InputError :message="errors.email" />
                                    </div>

                                    <button
                                        type="submit"
                                        class="inline-flex h-12 w-full cursor-pointer items-center justify-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-70"
                                        :disabled="processing"
                                        data-test="email-password-reset-link-button"
                                    >
                                        <Spinner v-if="processing" />
                                        <span v-else
                                            >Email password reset link</span
                                        >
                                    </button>
                                </Form>

                                <div
                                    class="mt-5 text-center text-sm text-zinc-600"
                                >
                                    <span>Or return to</span>
                                    <Link
                                        :href="login()"
                                        class="ml-1 cursor-pointer font-semibold text-zinc-950 underline underline-offset-4"
                                    >
                                        log in
                                    </Link>
                                </div>
                            </div>
                        </section>

                        <section
                            class="hidden border-l border-zinc-200 px-10 py-12 lg:flex lg:items-center lg:px-16"
                        >
                            <div class="max-w-[420px]">
                                <h1
                                    class="text-5xl font-semibold tracking-tight text-zinc-950"
                                >
                                    Reset access.
                                </h1>
                                <div
                                    class="mt-8 space-y-6 text-lg leading-8 text-zinc-600"
                                >
                                    <p>
                                        Enter your email and we&apos;ll send a
                                        secure reset link so you can get back
                                        into your workspace quickly.
                                    </p>
                                    <p>
                                        Keep your account moving without losing
                                        momentum in your lead workflow.
                                    </p>
                                    <p class="font-medium text-zinc-900">
                                        You&apos;re one step away.
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

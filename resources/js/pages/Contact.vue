<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight } from 'lucide-vue-next';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { home } from '@/routes';
</script>

<template>
    <PublicLayout>
        <Head title="Contact" />

        <div class="min-h-screen bg-[#f8f7f4] text-zinc-950">
            <header class="border-b border-zinc-200/80 bg-[#fcfcfa]">
                <div
                    class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
                >
                    <Link :href="home()" class="flex items-center gap-3">
                        <div
                            class="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-sm font-semibold text-white"
                        >
                            LN
                        </div>
                        <div>
                            <div class="text-base font-semibold text-zinc-950">
                                LeadNest
                            </div>
                            <div
                                class="text-[11px] tracking-[0.24em] text-zinc-500 uppercase"
                            >
                                Lead generation OS
                            </div>
                        </div>
                    </Link>

                    <Link
                        :href="home()"
                        class="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950"
                    >
                        Back to home
                    </Link>
                </div>
            </header>

            <main class="px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div class="mx-auto max-w-6xl">
                    <div class="mx-auto max-w-3xl text-center">
                        <p
                            class="text-[11px] font-semibold tracking-[0.28em] text-zinc-500 uppercase"
                        >
                            Contact
                        </p>
                        <h1
                            class="mt-4 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl"
                        >
                            Tell us what kind of leads you need.
                        </h1>
                        <p
                            class="mx-auto mt-4 max-w-2xl text-base text-zinc-600"
                        >
                            Share your details and message. We will follow up
                            with the right team.
                        </p>
                    </div>

                    <div class="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
                        <section
                            class="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_rgba(24,24,27,0.05)] sm:p-8"
                        >
                            <form class="grid gap-5">
                                <div class="space-y-2">
                                    <label
                                        for="contact-name"
                                        class="text-sm font-medium text-zinc-900"
                                    >
                                        Name
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        class="h-12 rounded-2xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 transition outline-none placeholder:text-zinc-400 focus:border-zinc-950"
                                    />
                                </div>

                                <div class="space-y-2">
                                    <label
                                        for="contact-email"
                                        class="text-sm font-medium text-zinc-900"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        placeholder="Enter your work email"
                                        class="h-12 rounded-2xl border border-zinc-300 bg-white px-4 text-sm text-zinc-950 transition outline-none placeholder:text-zinc-400 focus:border-zinc-950"
                                    />
                                </div>

                                <div class="space-y-2">
                                    <label
                                        for="contact-message"
                                        class="text-sm font-medium text-zinc-900"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="contact-message"
                                        rows="6"
                                        placeholder="Tell us about your lead requirements."
                                        class="rounded-[24px] border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-950 transition outline-none placeholder:text-zinc-400 focus:border-zinc-950"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    class="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition hover:bg-black"
                                >
                                    Submit
                                    <ArrowRight class="h-4 w-4" />
                                </button>
                            </form>
                        </section>

                        <section class="space-y-4">
                            <article
                                class="rounded-[28px] border border-zinc-200 bg-[#fcfcfa] p-6"
                            >
                                <p
                                    class="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase"
                                >
                                    Email
                                </p>
                                <p
                                    class="mt-2 text-base font-semibold text-zinc-950"
                                >
                                    sales@leadnest.com
                                </p>
                            </article>
                            <article
                                class="rounded-[28px] border border-zinc-200 bg-[#fcfcfa] p-6"
                            >
                                <p
                                    class="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase"
                                >
                                    Office hours
                                </p>
                                <p class="mt-2 text-sm leading-7 text-zinc-600">
                                    Monday to Friday, 9:00 AM to 6:00 PM GST.
                                </p>
                            </article>
                            <article
                                class="rounded-[28px] border border-zinc-200 bg-[#fcfcfa] p-6"
                            >
                                <p
                                    class="text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase"
                                >
                                    Best for
                                </p>
                                <p class="mt-2 text-sm leading-7 text-zinc-600">
                                    Demo requests, onboarding questions, and
                                    buyer matching discussions.
                                </p>
                            </article>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    </PublicLayout>
</template>

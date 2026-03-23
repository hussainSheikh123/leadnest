<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { ArrowUpRight, Check, ShieldCheck, Workflow } from 'lucide-vue-next';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();

const proofPoints = [
    'Verified lead data structured for fast outreach.',
    'Clear segmentation for agencies, sales teams, and operators.',
    'A focused workspace that feels premium before backend depth arrives.',
];

const operatingSignals = [
    { label: 'List building', value: '< 5 min' },
    { label: 'Team handoff', value: 'Instant' },
    { label: 'Workspace feel', value: 'Clean' },
];
</script>

<template>
    <div
        class="relative min-h-screen overflow-hidden bg-[#f2f2ee] text-zinc-950"
    >
        <div
            class="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,_rgba(24,24,27,0.10),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(24,24,27,0.06),_transparent_24%),linear-gradient(to_bottom,_#fbfbf8,_#f2f2ee)]"
        />
        <div
            class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(24,24,27,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(24,24,27,0.05)_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,black,transparent_86%)] bg-[size:44px_44px]"
        />

        <div
            class="relative mx-auto flex min-h-screen max-w-[1380px] flex-col px-4 py-5 sm:px-6 lg:px-8"
        >
            <div class="flex items-center justify-between gap-4">
                <Link :href="home()" class="inline-flex items-center gap-3">
                    <div
                        class="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-sm font-semibold text-white shadow-[0_18px_45px_rgba(24,24,27,0.22)]"
                    >
                        LN
                    </div>
                    <div>
                        <div
                            class="text-base font-semibold tracking-tight text-zinc-950"
                        >
                            LeadNest
                        </div>
                        <div
                            class="text-xs tracking-[0.28em] text-zinc-500 uppercase"
                        >
                            Lead ops workspace
                        </div>
                    </div>
                </Link>

                <div
                    class="hidden rounded-full border border-zinc-300/80 bg-white/80 px-4 py-2 text-xs font-medium tracking-[0.2em] text-zinc-600 uppercase md:inline-flex md:items-center md:gap-2"
                >
                    <ShieldCheck class="h-3.5 w-3.5" />
                    Secure account access
                </div>
            </div>

            <div class="flex flex-1 items-center py-8 sm:py-10 lg:py-14">
                <div class="grid w-full gap-6 lg:grid-cols-[1.08fr_0.92fr]">
                    <section
                        class="relative overflow-hidden rounded-[34px] border border-zinc-900 bg-zinc-950 p-7 text-white shadow-[0_28px_90px_rgba(24,24,27,0.24)] sm:p-9 lg:p-10"
                    >
                        <div
                            class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.08),_transparent_24%),linear-gradient(to_bottom_right,transparent,rgba(255,255,255,0.03))]"
                        />

                        <div
                            class="relative flex h-full flex-col justify-between gap-10"
                        >
                            <div>
                                <div
                                    class="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-3 py-2 text-[11px] font-medium tracking-[0.28em] text-zinc-300 uppercase"
                                >
                                    <Workflow class="h-3.5 w-3.5" />
                                    Built for modern outbound teams
                                </div>

                                <h2
                                    class="mt-7 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.6rem] lg:leading-[1.02]"
                                >
                                    Give your lead generation flow a sharper
                                    front door.
                                </h2>

                                <p
                                    class="mt-5 max-w-xl text-sm leading-7 text-zinc-300 sm:text-base"
                                >
                                    The structure stays lightweight, but the
                                    experience should already feel deliberate:
                                    fast to scan, clean to trust, and ready for
                                    high-intent pipeline work.
                                </p>
                            </div>

                            <div class="grid gap-4 sm:grid-cols-3">
                                <div
                                    v-for="signal in operatingSignals"
                                    :key="signal.label"
                                    class="rounded-[24px] border border-white/10 bg-white/6 p-4"
                                >
                                    <div
                                        class="text-[11px] tracking-[0.24em] text-zinc-400 uppercase"
                                    >
                                        {{ signal.label }}
                                    </div>
                                    <div
                                        class="mt-3 text-2xl font-semibold tracking-tight text-white"
                                    >
                                        {{ signal.value }}
                                    </div>
                                </div>
                            </div>

                            <div
                                class="rounded-[26px] border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:p-6"
                            >
                                <div
                                    class="flex items-center justify-between gap-4"
                                >
                                    <div>
                                        <div
                                            class="text-sm font-semibold text-white"
                                        >
                                            What this flow should communicate
                                        </div>
                                        <div class="mt-1 text-sm text-zinc-400">
                                            Confidence, clarity, and operational
                                            readiness.
                                        </div>
                                    </div>
                                    <ArrowUpRight
                                        class="hidden h-5 w-5 text-zinc-300 sm:block"
                                    />
                                </div>

                                <ul class="mt-5 space-y-3">
                                    <li
                                        v-for="point in proofPoints"
                                        :key="point"
                                        class="flex items-start gap-3 text-sm leading-6 text-zinc-300"
                                    >
                                        <span
                                            class="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white"
                                        >
                                            <Check class="h-3.5 w-3.5" />
                                        </span>
                                        <span>{{ point }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section
                        class="rounded-[34px] border border-zinc-200/80 bg-white/92 p-6 shadow-[0_28px_80px_rgba(24,24,27,0.08)] backdrop-blur sm:p-8 lg:p-10"
                    >
                        <div class="max-w-md">
                            <p
                                class="text-[11px] font-semibold tracking-[0.28em] text-zinc-500 uppercase"
                            >
                                Account access
                            </p>
                            <h1
                                class="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl"
                            >
                                {{ title }}
                            </h1>
                            <p
                                class="mt-4 text-sm leading-7 text-zinc-600 sm:text-base"
                            >
                                {{ description }}
                            </p>
                        </div>

                        <div class="mt-8">
                            <slot />
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </div>
</template>

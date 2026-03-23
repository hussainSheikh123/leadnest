<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
</script>

<template>
    <Head title="Appearance settings" />

    <h1 class="sr-only">Appearance settings</h1>

    <SettingsLayout>
        <section
            class="rounded-[34px] border border-zinc-200 bg-white p-6 shadow-[0_20px_60px_rgba(24,24,27,0.05)] sm:p-8"
        >
            <div class="max-w-3xl space-y-6">
                <Heading
                    variant="small"
                    title="Appearance settings"
                    description="Theme controls are now available in the top settings bar for faster access."
                />

                <div
                    class="rounded-[28px] border border-zinc-200 bg-[#faf9f6] p-5"
                >
                    <div
                        class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                    >
                        Theme behavior
                    </div>
                    <p class="mt-3 text-sm leading-7 text-zinc-600">
                        Use the appearance control in the header to switch
                        light, dark, or system mode without leaving the current
                        settings view.
                    </p>
                </div>
            </div>
        </section>
    </SettingsLayout>
</template>

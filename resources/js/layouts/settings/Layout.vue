<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import AppearanceTabs from '@/components/AppearanceTabs.vue';
import UserMenuContent from '@/components/UserMenuContent.vue';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { getInitials } from '@/composables/useInitials';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { dashboard, home } from '@/routes';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const navItems: NavItem[] = [
    {
        title: 'Profile',
        href: editProfile(),
    },
    {
        title: 'Security',
        href: editSecurity(),
    },
    {
        title: 'Appearance',
        href: editAppearance(),
    },
];

const page = usePage();
const auth = computed(() => page.props.auth);
const { isCurrentOrParentUrl } = useCurrentUrl();
</script>

<template>
    <PublicLayout>
        <div class="min-h-screen bg-[#f7f5ef] text-zinc-950">
            <header
                class="sticky top-0 z-40 border-b border-zinc-200/80 bg-[#fcfbf8]/90 backdrop-blur-xl"
            >
                <div
                    class="mx-auto flex max-w-[1480px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8"
                >
                    <div class="flex items-center gap-3">
                        <Link
                            :href="home()"
                            class="inline-flex items-center gap-3"
                        >
                            <div
                                class="flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(24,24,27,0.16)]"
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
                                    class="text-[11px] tracking-[0.24em] text-zinc-500 uppercase"
                                >
                                    Account settings
                                </div>
                            </div>
                        </Link>

                        <Link
                            :href="dashboard()"
                            class="hidden rounded-full border border-zinc-200 bg-white px-3 py-2 text-xs font-medium tracking-[0.18em] text-zinc-600 uppercase transition hover:border-zinc-950 hover:text-zinc-950 sm:inline-flex"
                        >
                            Dashboard
                        </Link>
                    </div>

                    <div class="flex items-center gap-2 sm:gap-3">
                        <div class="hidden text-right sm:block">
                            <div class="text-sm font-medium text-zinc-950">
                                {{ auth.user.name }}
                            </div>
                            <div class="text-xs text-zinc-500">
                                Manage account and preferences
                            </div>
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger :as-child="true">
                                <button
                                    type="button"
                                    class="relative flex cursor-pointer items-center gap-3 rounded-full border border-zinc-200 bg-white p-1 pr-3 pl-1 transition hover:border-zinc-950 focus:outline-none"
                                >
                                    <Avatar
                                        class="size-9 overflow-hidden rounded-full"
                                    >
                                        <AvatarImage
                                            v-if="auth.user.avatar"
                                            :src="auth.user.avatar"
                                            :alt="auth.user.name"
                                        />
                                        <AvatarFallback
                                            class="bg-zinc-950 font-semibold text-white"
                                        >
                                            {{ getInitials(auth.user?.name) }}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span
                                        class="hidden text-sm font-medium text-zinc-900 sm:inline"
                                    >
                                        Account
                                    </span>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" class="w-56">
                                <UserMenuContent :user="auth.user" />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <main
                class="mx-auto flex w-full max-w-[1480px] flex-col gap-6 px-4 py-5 sm:px-6 lg:px-8"
            >
                <section
                    class="overflow-hidden rounded-[34px] border border-zinc-200 bg-white shadow-[0_24px_70px_rgba(24,24,27,0.06)]"
                >
                    <div class="grid gap-0 xl:grid-cols-[1fr_0.78fr]">
                        <div class="px-6 py-7 sm:px-8 lg:px-10 lg:py-9">
                            <div
                                class="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-[#f6f4ef] px-3 py-1.5 text-xs font-medium tracking-[0.18em] text-zinc-600 uppercase"
                            >
                                Settings workspace
                            </div>
                            <h1
                                class="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl"
                            >
                                Manage profile, security, and appearance from
                                one clean workspace.
                            </h1>
                            <p
                                class="mt-4 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg"
                            >
                                The sidebar is removed. Navigation is now at the
                                top, and appearance controls are accessible
                                directly from the settings header.
                            </p>

                            <div class="mt-6 flex flex-wrap gap-2">
                                <Link
                                    v-for="item in navItems"
                                    :key="item.title"
                                    :href="item.href"
                                    :class="[
                                        'rounded-full px-4 py-2 text-sm font-medium transition',
                                        isCurrentOrParentUrl(item.href)
                                            ? 'bg-zinc-950 text-white'
                                            : 'border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-950 hover:text-zinc-950',
                                    ]"
                                >
                                    {{ item.title }}
                                </Link>
                            </div>
                        </div>

                        <div
                            class="border-t border-zinc-200 bg-[#fbfaf7] px-6 py-7 sm:px-8 lg:px-10 lg:py-9 xl:border-t-0 xl:border-l"
                        >
                            <div
                                class="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-[0_18px_48px_rgba(24,24,27,0.04)]"
                            >
                                <div
                                    class="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase"
                                >
                                    Appearance quick access
                                </div>
                                <h2
                                    class="mt-3 text-2xl font-semibold tracking-tight text-zinc-950"
                                >
                                    Theme mode
                                </h2>
                                <p class="mt-2 text-sm leading-7 text-zinc-600">
                                    Switch light, dark, or system mode directly
                                    from the top settings area.
                                </p>

                                <div class="mt-5">
                                    <AppearanceTabs />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="grid gap-6">
                    <slot />
                </section>
            </main>
        </div>
    </PublicLayout>
</template>

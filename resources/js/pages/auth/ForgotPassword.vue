<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import { KeyRound, ShieldCheck } from 'lucide-vue-next';
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
        <Head title="Forgot password">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
                rel="stylesheet"
            />
        </Head>

        <div class="auth-shell">
            <div class="auth-frame">
                <header class="auth-topbar">
                    <Link :href="home()" class="brand-lockup">
                        <div class="brand-mark">LN</div>
                        <span class="brand-text">Lead<span>Nest</span></span>
                    </Link>

                    <div class="secure-pill">
                        <ShieldCheck class="h-3.5 w-3.5" />
                        Secure account access
                    </div>
                </header>

                <main class="auth-grid">
                    <section class="auth-stage">
                        <div class="form-panel">
                            <div class="form-intro">
                                <div class="form-kicker">
                                    <KeyRound class="h-3.5 w-3.5" />
                                    Password recovery
                                </div>
                                <h2>Reset your password</h2>
                                <p>
                                    Enter your work email and we&apos;ll send a
                                    secure reset link so you can get back into
                                    your workspace quickly.
                                </p>
                            </div>

                            <div v-if="status" class="status-banner">
                                {{ status }}
                            </div>

                            <Form
                                v-bind="email.form()"
                                v-slot="{ errors, processing }"
                                class="form-stack"
                            >
                                <div class="field-group">
                                    <Label for="email" class="field-label">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        autocomplete="off"
                                        autofocus
                                        placeholder="Enter your work email address"
                                        class="auth-input"
                                    />
                                    <InputError :message="errors.email" />
                                </div>

                                <button
                                    type="submit"
                                    class="submit-button"
                                    :disabled="processing"
                                    data-test="email-password-reset-link-button"
                                >
                                    <Spinner v-if="processing" />
                                    <span v-else
                                        >Email password reset link</span
                                    >
                                </button>
                            </Form>

                            <div class="back-copy">
                                <span>Or return to</span>
                                <Link :href="login()" class="back-link">
                                    log in
                                </Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    </PublicLayout>
</template>

<style scoped>
.auth-shell {
    --black: #0d0d0d;
    --white: #ffffff;
    --g2: #26211a;
    --g3: #5e5548;
    --g4: #908574;
    --gold: #b8892a;
    --gold-l: #d4a84b;
    --fd: 'Playfair Display', serif;
    --fb: 'Outfit', sans-serif;
    --fm: 'JetBrains Mono', monospace;
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    background:
        radial-gradient(
            circle at top left,
            rgba(240, 208, 128, 0.22),
            transparent 28%
        ),
        radial-gradient(
            circle at 88% 20%,
            rgba(212, 168, 75, 0.14),
            transparent 18%
        ),
        linear-gradient(180deg, #fffdfa 0%, #f8f3ea 100%);
    color: var(--black);
    font-family: var(--fb);
}

.auth-shell::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(
        circle,
        rgba(13, 13, 13, 0.08) 1px,
        transparent 1px
    );
    background-size: 28px 28px;
    opacity: 0.78;
    pointer-events: none;
}

.auth-shell::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.auth-frame {
    position: relative;
    z-index: 1;
    display: flex;
    min-height: 100vh;
    max-width: 1380px;
    flex-direction: column;
    margin: 0 auto;
    padding: 1.4rem 1.25rem 2rem;
}

.auth-topbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.brand-lockup {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    text-decoration: none;
}

.brand-mark {
    display: flex;
    height: 36px;
    width: 36px;
    align-items: center;
    justify-content: center;
    clip-path: polygon(
        0 0,
        calc(100% - 7px) 0,
        100% 7px,
        100% 100%,
        7px 100%,
        0 calc(100% - 7px)
    );
    background: var(--black);
    color: var(--gold-l);
    font-family: var(--fm);
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.05em;
}

.brand-text {
    color: var(--black);
    font-family: var(--fd);
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 0.01em;
}

.brand-text span {
    color: var(--gold);
}

.secure-pill {
    display: none;
    align-items: center;
    gap: 0.55rem;
    border: 1px solid rgba(144, 133, 116, 0.26);
    background: rgba(255, 255, 255, 0.72);
    padding: 0.75rem 1rem;
    color: var(--g3);
    font-family: var(--fm);
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    backdrop-filter: blur(12px);
}

.auth-grid {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 2rem 0 0;
}

.auth-stage {
    width: 100%;
    max-width: 34rem;
    padding-top: 1rem;
}

.form-panel {
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.88);
    background: rgba(255, 253, 250, 0.94);
    padding: 1.45rem;
    box-shadow:
        0 28px 80px rgba(13, 13, 13, 0.12),
        0 10px 24px rgba(184, 137, 42, 0.08);
    backdrop-filter: blur(18px);
}

.form-kicker {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    width: fit-content;
    color: var(--gold);
    font-family: var(--fm);
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
}

.form-panel h2 {
    margin-top: 0.9rem;
    font-family: var(--fd);
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 500;
    letter-spacing: -0.02em;
    line-height: 1.04;
}

.form-intro p {
    margin-top: 0.85rem;
    color: var(--g3);
    font-size: 0.98rem;
    line-height: 1.85;
}

.status-banner {
    margin: 1.35rem 0 0;
    border: 1px solid rgba(184, 137, 42, 0.18);
    background: linear-gradient(135deg, #fff9ee, #f9f1e2);
    padding: 0.9rem 1rem;
    color: var(--g2);
    font-size: 0.92rem;
    line-height: 1.65;
}

.form-stack {
    display: grid;
    gap: 1rem;
    margin-top: 1.35rem;
}

.field-group {
    display: grid;
    gap: 0.55rem;
}

.field-label {
    color: var(--black);
    font-size: 0.92rem;
    font-weight: 500;
}

:deep(.auth-input) {
    height: 3.45rem;
    border-color: rgba(144, 133, 116, 0.24);
    background: rgba(255, 255, 255, 0.96);
    padding: 0 1rem;
    color: var(--black);
    box-shadow: none;
}

:deep(.auth-input::placeholder) {
    color: rgba(144, 133, 116, 0.9);
}

:deep(.auth-input:focus-visible) {
    border-color: rgba(184, 137, 42, 0.6);
    box-shadow: 0 0 0 4px rgba(184, 137, 42, 0.08);
}

.submit-button {
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    border: 1px solid transparent;
    margin-top: 0.25rem;
    padding: 1rem 1.15rem;
    background: linear-gradient(135deg, var(--black), #1b1b1b);
    color: var(--white);
    font-family: var(--fb);
    font-size: 0.94rem;
    font-weight: 500;
    box-shadow: 0 20px 34px rgba(13, 13, 13, 0.18);
    transition:
        transform 0.28s ease,
        background 0.28s ease,
        color 0.28s ease,
        box-shadow 0.28s ease;
}

.submit-button:hover:not(:disabled) {
    transform: translateY(-2px);
    background: linear-gradient(135deg, var(--gold), var(--gold-l));
    color: var(--black);
    box-shadow: 0 24px 40px rgba(184, 137, 42, 0.26);
}

.submit-button:disabled {
    cursor: not-allowed;
    opacity: 0.75;
}

.back-copy {
    margin-top: 1.2rem;
    text-align: center;
    color: var(--g3);
    font-size: 0.92rem;
}

.back-link {
    margin-left: 0.35rem;
    color: var(--black);
    text-decoration: none;
    border-bottom: 1px solid rgba(184, 137, 42, 0.45);
    transition:
        color 0.28s ease,
        border-color 0.28s ease;
}

.back-link:hover {
    color: var(--gold);
    border-color: var(--gold);
}

@media (min-width: 768px) {
    .auth-frame {
        padding: 1.5rem 1.8rem 2.2rem;
    }

    .secure-pill {
        display: inline-flex;
    }

    .form-panel {
        padding: 2rem;
    }
}

@media (min-width: 1120px) {
    .auth-frame {
        padding: 1.6rem 2.2rem 2.4rem;
    }

    .auth-grid {
        padding-top: 2.4rem;
    }
}

@media (max-width: 767px) {
    .auth-frame {
        padding: 1rem 1rem 1.5rem;
    }

    .auth-grid {
        padding-top: 1.2rem;
    }

    .form-panel {
        padding: 1.25rem;
    }
}
</style>

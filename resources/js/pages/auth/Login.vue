<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import { LockKeyhole, ShieldCheck } from 'lucide-vue-next';
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
        <Head title="Log in">
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

        <div class="auth-login-shell">
            <div class="auth-login-frame">
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
                                    <LockKeyhole class="h-3.5 w-3.5" />
                                    Account access
                                </div>
                                <h2>Sign in to your workspace</h2>
                                <p>
                                    Continue with your work email and pick up
                                    where your latest lead review left off.
                                </p>
                            </div>

                            <button type="button" class="google-button">
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

                            <div class="divider">
                                <span>or continue with email</span>
                            </div>

                            <div v-if="status" class="status-banner">
                                {{ status }}
                            </div>

                            <Form
                                v-bind="store.form()"
                                :reset-on-success="['password']"
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
                                        required
                                        autofocus
                                        :tabindex="1"
                                        autocomplete="email"
                                        placeholder="Enter your work email address"
                                        class="auth-input"
                                    />
                                    <InputError :message="errors.email" />
                                </div>

                                <div class="field-group">
                                    <div class="field-row">
                                        <Label
                                            for="password"
                                            class="field-label"
                                        >
                                            Password
                                        </Label>
                                        <Link
                                            v-if="canResetPassword"
                                            :href="request()"
                                            class="field-link"
                                            :tabindex="5"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

                                    <div class="password-wrap">
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
                                            class="auth-input auth-input-password"
                                        />
                                        <button
                                            type="button"
                                            @click="
                                                showPassword = !showPassword
                                            "
                                            class="password-toggle"
                                            tabindex="-1"
                                        >
                                            {{ showPassword ? 'Hide' : 'Show' }}
                                        </button>
                                    </div>
                                    <InputError :message="errors.password" />
                                </div>

                                <div class="remember-row">
                                    <Label
                                        for="remember"
                                        class="remember-label"
                                    >
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            :tabindex="3"
                                            class="remember-checkbox"
                                        />
                                        <span>Remember me</span>
                                    </Label>
                                </div>

                                <button
                                    type="submit"
                                    class="submit-button"
                                    :tabindex="4"
                                    :disabled="processing"
                                    data-test="login-button"
                                >
                                    <Spinner v-if="processing" />
                                    <span v-else>Continue to dashboard</span>
                                </button>

                                <div v-if="canRegister" class="register-copy">
                                    New to LeadNest?
                                    <Link
                                        :href="register()"
                                        class="register-link"
                                        :tabindex="5"
                                    >
                                        Create your account
                                    </Link>
                                </div>
                            </Form>

                            <p class="legal-copy">
                                By continuing, you agree to the platform terms
                                and privacy policy.
                            </p>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    </PublicLayout>
</template>

<style scoped>
.auth-login-shell {
    --black: #0d0d0d;
    --white: #ffffff;
    --off: #fbf8f2;
    --off2: #f4ede0;
    --g2: #26211a;
    --g3: #5e5548;
    --g4: #908574;
    --g6: #ddd3c2;
    --g7: #ece2d3;
    --gold: #b8892a;
    --gold-l: #d4a84b;
    --gold-ll: #eed28c;
    --gold-bg: #f8f1e2;
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

.auth-login-shell::before {
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

.auth-login-shell::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
}

.auth-login-frame {
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
    font-family: var(--fd);
    font-weight: 500;
    letter-spacing: -0.02em;
}

.form-intro p,
.legal-copy {
    max-width: 36rem;
    color: var(--g3);
    font-size: 1rem;
    line-height: 1.85;
}

.auth-stage {
    position: relative;
    width: 100%;
    max-width: 34rem;
    padding-top: 1rem;
}

.form-panel {
    position: relative;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.88);
    background: rgba(255, 253, 250, 0.94);
    padding: 1.45rem;
    box-shadow:
        0 28px 80px rgba(13, 13, 13, 0.12),
        0 10px 24px rgba(184, 137, 42, 0.08);
    backdrop-filter: blur(18px);
}

.form-intro h2 {
    margin-top: 0.9rem;
    font-size: clamp(2rem, 4vw, 2.8rem);
    line-height: 1.04;
}

.form-intro p {
    margin-top: 0.85rem;
    font-size: 0.98rem;
}

.google-button,
.submit-button {
    display: inline-flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    border: 1px solid transparent;
    padding: 1rem 1.15rem;
    font-family: var(--fb);
    font-size: 0.94rem;
    font-weight: 500;
    transition:
        transform 0.28s ease,
        background 0.28s ease,
        color 0.28s ease,
        border-color 0.28s ease,
        box-shadow 0.28s ease;
}

.google-button {
    margin-top: 1.6rem;
    border-color: rgba(144, 133, 116, 0.24);
    background: rgba(255, 255, 255, 0.92);
    color: var(--black);
    box-shadow: 0 12px 30px rgba(13, 13, 13, 0.04);
}

.google-button:hover {
    transform: translateY(-2px);
    border-color: rgba(184, 137, 42, 0.28);
    box-shadow: 0 18px 34px rgba(13, 13, 13, 0.08);
}

.divider {
    position: relative;
    margin: 1.35rem 0;
    text-align: center;
}

.divider::before {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    left: 0;
    border-top: 1px solid rgba(221, 211, 194, 0.95);
}

.divider span {
    position: relative;
    display: inline-block;
    background: rgba(255, 253, 250, 0.94);
    padding: 0 0.85rem;
    color: var(--g4);
    font-family: var(--fm);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.status-banner {
    margin-bottom: 1rem;
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
}

.field-group {
    display: grid;
    gap: 0.55rem;
}

.field-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
}

.field-label {
    color: var(--black);
    font-size: 0.92rem;
    font-weight: 500;
}

.field-link {
    color: var(--g3);
    font-size: 0.83rem;
    text-decoration: none;
    transition: color 0.28s ease;
}

.field-link:hover {
    color: var(--gold);
}

.password-wrap {
    position: relative;
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

:deep(.auth-input-password) {
    padding-right: 4.5rem;
}

.password-toggle {
    position: absolute;
    top: 50%;
    right: 1rem;
    transform: translateY(-50%);
    border: none;
    background: transparent;
    color: var(--g4);
    font-size: 0.82rem;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.28s ease;
}

.password-toggle:hover {
    color: var(--gold);
}

.remember-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 0.1rem;
}

.remember-label {
    display: inline-flex;
    align-items: center;
    gap: 0.7rem;
    color: var(--g3);
    font-size: 0.9rem;
}

:deep(.remember-checkbox) {
    border-color: rgba(13, 13, 13, 0.6);
    box-shadow: none;
}

:deep(.remember-checkbox[data-state='checked']) {
    border-color: var(--black);
    background: var(--black);
}

.submit-button {
    margin-top: 0.25rem;
    background: linear-gradient(135deg, var(--black), #1b1b1b);
    color: var(--white);
    box-shadow: 0 20px 34px rgba(13, 13, 13, 0.18);
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

.register-copy {
    text-align: center;
    color: var(--g3);
    font-size: 0.92rem;
}

.register-link {
    margin-left: 0.35rem;
    color: var(--black);
    text-decoration: none;
    border-bottom: 1px solid rgba(184, 137, 42, 0.45);
    transition:
        color 0.28s ease,
        border-color 0.28s ease;
}

.register-link:hover {
    color: var(--gold);
    border-color: var(--gold);
}

.legal-copy {
    margin-top: 1.2rem;
    font-size: 0.82rem;
    line-height: 1.75;
}

@media (min-width: 768px) {
    .auth-login-frame {
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
    .auth-login-frame {
        padding: 1.6rem 2.2rem 2.4rem;
    }

    .auth-grid {
        padding-top: 2.4rem;
    }
}

@media (max-width: 767px) {
    .auth-login-frame {
        padding: 1rem 1rem 1.5rem;
    }

    .auth-grid {
        gap: 1.5rem;
        padding-top: 1.2rem;
    }

    .form-panel {
        width: 100%;
        padding: 1.25rem;
    }

    .field-row {
        align-items: flex-start;
        flex-direction: column;
        gap: 0.3rem;
    }
}
</style>

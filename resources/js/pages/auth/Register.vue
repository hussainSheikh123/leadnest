<script setup lang="ts">
import { Form, Head, Link } from '@inertiajs/vue3';
import { LockKeyhole, ShieldCheck } from 'lucide-vue-next';
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
        <Head title="Register">
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
                    <section class="auth-stage auth-stage-wide">
                        <div class="form-panel">
                            <div class="form-intro">
                                <div class="form-kicker">
                                    <LockKeyhole class="h-3.5 w-3.5" />
                                    Create account
                                </div>
                                <h2>Build your workspace</h2>
                                <p>
                                    Create your LeadNest account with the same
                                    clean premium feel and a tighter signup flow
                                    that is easier to scan.
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
                                <span>Sign up with Google</span>
                            </button>

                            <div class="divider">
                                <span>or continue with email</span>
                            </div>

                            <Form
                                v-bind="store.form()"
                                :reset-on-success="[
                                    'password',
                                    'password_confirmation',
                                ]"
                                v-slot="{ errors, processing }"
                                class="form-stack register-grid"
                            >
                                <div class="field-group">
                                    <Label for="name" class="field-label">
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
                                        class="auth-input"
                                    />
                                    <InputError :message="errors.name" />
                                </div>

                                <div class="field-group">
                                    <Label for="email" class="field-label">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        :tabindex="2"
                                        autocomplete="email"
                                        name="email"
                                        placeholder="Enter your work email address"
                                        class="auth-input"
                                    />
                                    <InputError :message="errors.email" />
                                </div>

                                <div class="field-group">
                                    <Label for="phone" class="field-label">
                                        Phone number
                                    </Label>
                                    <div class="phone-grid">
                                        <select
                                            id="phone_country_code"
                                            name="phone_country_code"
                                            required
                                            :tabindex="3"
                                            class="auth-select"
                                        >
                                            <option value="+971">+971</option>
                                            <option value="+966">+966</option>
                                            <option value="+973">+973</option>
                                            <option value="+974">+974</option>
                                            <option value="+965">+965</option>
                                        </select>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            required
                                            :tabindex="4"
                                            autocomplete="tel-national"
                                            name="phone"
                                            placeholder="50 123 4567"
                                            class="auth-input"
                                        />
                                    </div>
                                </div>

                                <div class="field-group">
                                    <Label for="password" class="field-label">
                                        Password
                                    </Label>
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
                                            :tabindex="5"
                                            autocomplete="new-password"
                                            placeholder="Create a password"
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

                                <div class="field-group field-span-2">
                                    <Label
                                        for="password_confirmation"
                                        class="field-label"
                                    >
                                        Confirm password
                                    </Label>
                                    <div class="password-wrap">
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
                                            class="auth-input auth-input-password"
                                        />
                                        <button
                                            type="button"
                                            @click="
                                                showConfirmPassword =
                                                    !showConfirmPassword
                                            "
                                            class="password-toggle"
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
                                        :message="errors.password_confirmation"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    class="submit-button field-span-2"
                                    tabindex="7"
                                    :disabled="processing"
                                    data-test="register-user-button"
                                >
                                    <Spinner v-if="processing" />
                                    <span v-else>Create account</span>
                                </button>

                                <div class="register-copy field-span-2">
                                    Already have an account?
                                    <Link
                                        :href="login()"
                                        class="register-link"
                                        :tabindex="8"
                                    >
                                        Log in
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

.auth-stage-wide {
    max-width: 54rem;
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

.form-intro p,
.legal-copy {
    color: var(--g3);
    font-size: 0.98rem;
    line-height: 1.85;
}

.form-intro p {
    max-width: 42rem;
    margin-top: 0.85rem;
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

.form-stack {
    display: grid;
    gap: 1rem;
}

.register-grid {
    grid-template-columns: 1fr;
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

.phone-grid {
    display: grid;
    grid-template-columns: 112px 1fr;
    gap: 0.75rem;
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

.auth-select {
    height: 3.45rem;
    border: 1px solid rgba(144, 133, 116, 0.24);
    background: rgba(255, 255, 255, 0.96);
    padding: 0 0.95rem;
    color: var(--black);
    font-size: 0.95rem;
    outline: none;
    transition:
        border-color 0.28s ease,
        box-shadow 0.28s ease;
}

.auth-select:focus {
    border-color: rgba(184, 137, 42, 0.6);
    box-shadow: 0 0 0 4px rgba(184, 137, 42, 0.08);
}

.password-wrap {
    position: relative;
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

.field-span-2 {
    grid-column: span 1;
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
    .auth-frame {
        padding: 1.5rem 1.8rem 2.2rem;
    }

    .secure-pill {
        display: inline-flex;
    }

    .form-panel {
        padding: 2rem;
    }

    .register-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        column-gap: 1rem;
        row-gap: 1rem;
    }

    .field-span-2 {
        grid-column: span 2;
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

    .phone-grid {
        grid-template-columns: 1fr;
    }
}
</style>

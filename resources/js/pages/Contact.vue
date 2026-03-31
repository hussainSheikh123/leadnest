<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import { ArrowRight, Mail, MapPin, Menu, Phone, X } from 'lucide-vue-next';
import PublicLayout from '@/layouts/PublicLayout.vue';
import { dashboard, home, login, register } from '@/routes';
import { ref } from 'vue';

const mobileMenuOpen = ref(false);
</script>

<template>
    <PublicLayout>
        <Head title="Contact">
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossorigin="anonymous"
            />
            <link
                href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
                rel="stylesheet"
            />
        </Head>

        <div class="contact-white">
            <div class="mob-menu" :class="{ open: mobileMenuOpen }">
                <button
                    class="mob-close"
                    type="button"
                    @click="mobileMenuOpen = false"
                >
                    <X class="h-7 w-7" />
                </button>
                <Link :href="home()" @click="mobileMenuOpen = false">Home</Link>
                <Link
                    v-if="!$page.props.auth.user"
                    :href="login()"
                    @click="mobileMenuOpen = false"
                >
                    Login
                </Link>
                <Link
                    v-if="!$page.props.auth.user"
                    :href="register()"
                    @click="mobileMenuOpen = false"
                >
                    Register
                </Link>
                <Link
                    v-if="$page.props.auth.user"
                    :href="dashboard()"
                    @click="mobileMenuOpen = false"
                >
                    Dashboard
                </Link>
            </div>

            <header class="site-nav">
                <Link :href="home()" class="logo">
                    <div class="logo-mark">LN</div>
                    <span class="logo-text">Lead<span>Nest</span></span>
                </Link>

                <nav class="nav-links">
                    <Link :href="home()">Home</Link>
                    <Link v-if="!$page.props.auth.user" :href="login()"
                        >Login</Link
                    >
                    <Link
                        v-if="!$page.props.auth.user"
                        :href="register()"
                        class="nav-cta"
                    >
                        Register
                    </Link>
                    <Link
                        v-if="$page.props.auth.user"
                        :href="dashboard()"
                        class="nav-cta"
                    >
                        Dashboard
                    </Link>
                </nav>

                <button
                    class="hamburger"
                    type="button"
                    @click="mobileMenuOpen = true"
                >
                    <Menu class="h-5 w-5" />
                </button>
            </header>

            <main class="contact-main">
                <section class="contact-hero">
                    <div class="si">
                        <div class="contact-head">
                            <div>
                                <div class="slabel">Get In Touch</div>
                                <h1>
                                    Let's build your<br />
                                    <em>lead pipeline</em>
                                </h1>
                            </div>
                            <p class="hero-copy">
                                Our team will respond within 24 hours to discuss
                                how LeadNest can accelerate your B2B growth
                                across the UAE.
                            </p>
                        </div>

                        <div class="c-grid">
                            <div class="c-info">
                                <div class="c-det">
                                    <div class="c-det-icon">
                                        <MapPin class="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div class="c-det-lbl">Location</div>
                                        <div class="c-det-val">
                                            Dubai, United Arab Emirates
                                        </div>
                                    </div>
                                </div>

                                <div class="c-det">
                                    <div class="c-det-icon">
                                        <Mail class="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div class="c-det-lbl">Email</div>
                                        <div class="c-det-val">
                                            hello@leadnest.ae
                                        </div>
                                    </div>
                                </div>

                                <div class="c-det">
                                    <div class="c-det-icon">
                                        <Phone class="h-4 w-4" />
                                    </div>
                                    <div>
                                        <div class="c-det-lbl">
                                            WhatsApp / Phone
                                        </div>
                                        <div class="c-det-val">
                                            +971 4 XXX XXXX
                                        </div>
                                    </div>
                                </div>

                                <div class="info-card">
                                    <div class="info-label">Best for</div>
                                    <div class="info-title">
                                        Buyer onboarding, lead sourcing, and
                                        sales planning
                                    </div>
                                    <p class="info-copy">
                                        Use this page if you want a dedicated
                                        walkthrough of LeadNest, pricing
                                        guidance, or a lead generation plan for
                                        your business.
                                    </p>
                                </div>
                            </div>

                            <div class="c-form">
                                <div class="f-row">
                                    <div class="f-group">
                                        <label for="first-name"
                                            >First Name</label
                                        >
                                        <input
                                            id="first-name"
                                            type="text"
                                            placeholder="Ahmed"
                                        />
                                    </div>
                                    <div class="f-group">
                                        <label for="last-name">Last Name</label>
                                        <input
                                            id="last-name"
                                            type="text"
                                            placeholder="Al-Rashid"
                                        />
                                    </div>
                                </div>

                                <div class="f-group">
                                    <label for="email">Business Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="you@company.ae"
                                    />
                                </div>

                                <div class="f-group">
                                    <label for="company">Company Name</label>
                                    <input
                                        id="company"
                                        type="text"
                                        placeholder="Your Company LLC"
                                    />
                                </div>

                                <div class="f-group">
                                    <label for="industry">Industry</label>
                                    <select id="industry">
                                        <option value="">
                                            Select your industry
                                        </option>
                                        <option>Real Estate</option>
                                        <option>Financial Services</option>
                                        <option>Technology</option>
                                        <option>Healthcare</option>
                                        <option>Construction</option>
                                        <option>Logistics</option>
                                        <option>Legal Services</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                <div class="f-group">
                                    <label for="role">I am a...</label>
                                    <select id="role">
                                        <option value="">Select role</option>
                                        <option>
                                            Lead Buyer - I want to purchase
                                            leads
                                        </option>
                                        <option>
                                            Lead Seller - I want to submit leads
                                        </option>
                                        <option>Both</option>
                                    </select>
                                </div>

                                <div class="f-group">
                                    <label for="message">Message</label>
                                    <textarea
                                        id="message"
                                        rows="5"
                                        placeholder="Tell us about your goals..."
                                    />
                                </div>

                                <button class="btn-primary full" type="button">
                                    Submit Enquiry
                                    <ArrowRight class="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    </PublicLayout>
</template>

<style scoped>
.contact-white {
    --black: #0d0d0d;
    --white: #ffffff;
    --off: #f8f7f4;
    --g3: #555555;
    --g4: #888888;
    --g7: #ebebeb;
    --gold: #b8892a;
    --gold-l: #d4a84b;
    --fd: 'Playfair Display', serif;
    --fb: 'Outfit', sans-serif;
    --fm: 'JetBrains Mono', monospace;
    --r: 6px;
    --shadow: 0 2px 24px rgba(0, 0, 0, 0.07);
    background: var(--off);
    color: var(--black);
    font-family: var(--fb);
    min-height: 100vh;
}

.site-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--g7);
    background: rgba(255, 255, 255, 0.94);
    padding: 1rem 5rem;
    backdrop-filter: blur(12px);
}

.logo {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    text-decoration: none;
}

.logo-mark {
    display: flex;
    height: 36px;
    width: 36px;
    align-items: center;
    justify-content: center;
    background: var(--black);
    color: var(--gold-l);
    font-family: var(--fm);
    font-size: 0.65rem;
}

.logo-text {
    color: var(--black);
    font-family: var(--fd);
    font-size: 1.35rem;
    text-decoration: none;
}

.logo-text span {
    color: var(--gold);
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 1.6rem;
}

.nav-links a {
    color: var(--g3);
    font-size: 0.78rem;
    letter-spacing: 0.1em;
    text-decoration: none;
    text-transform: uppercase;
}

.nav-cta,
.btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    border-radius: 2px;
    background: var(--black);
    color: var(--white) !important;
    padding: 0.85rem 1.4rem;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    font-size: 0.78rem;
}

.hamburger {
    display: none;
    border: none;
    background: transparent;
}

.mob-menu {
    position: fixed;
    inset: 0;
    z-index: 200;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    background: white;
}

.mob-menu.open {
    display: flex;
}

.mob-menu a {
    color: var(--black);
    font-family: var(--fd);
    font-size: 2rem;
    text-decoration: none;
}

.mob-close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    border: none;
    background: transparent;
}

.contact-main {
    padding: 4rem 0 5rem;
}

.si {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 5rem;
}

.contact-head {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1.1fr 0.9fr;
    align-items: end;
    margin-bottom: 4rem;
}

.slabel {
    color: var(--gold);
    font-family: var(--fm);
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
}

h1 {
    margin-top: 1rem;
    font-family: var(--fd);
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    line-height: 1.05;
}

h1 em {
    color: var(--gold);
    font-style: italic;
    font-weight: 400;
}

.hero-copy {
    color: var(--g3);
    font-size: 1rem;
    line-height: 1.9;
}

.c-grid {
    display: grid;
    gap: 2rem;
    grid-template-columns: 0.9fr 1.1fr;
    align-items: start;
}

.c-info {
    display: grid;
    gap: 1.2rem;
}

.c-det,
.info-card,
.c-form {
    border: 1px solid var(--g7);
    border-radius: var(--r);
    background: var(--white);
    box-shadow: var(--shadow);
}

.c-det {
    display: flex;
    gap: 1rem;
    padding: 1.2rem;
}

.c-det-icon {
    display: flex;
    height: 40px;
    width: 40px;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--g7);
    border-radius: var(--r);
    background: var(--off);
    color: var(--gold);
}

.c-det-lbl {
    color: var(--g4);
    font-family: var(--fm);
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    margin-bottom: 0.2rem;
}

.c-det-val,
.info-copy {
    color: var(--g3);
    line-height: 1.8;
}

.info-card {
    padding: 1.6rem;
}

.info-label {
    color: var(--gold);
    font-family: var(--fm);
    font-size: 0.62rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
}

.info-title {
    margin-top: 0.8rem;
    font-family: var(--fd);
    font-size: 1.35rem;
}

.info-copy {
    margin-top: 0.8rem;
    font-size: 0.92rem;
}

.c-form {
    padding: 2rem;
}

.f-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.f-group {
    display: flex;
    flex-direction: column;
    gap: 0.45rem;
    margin-bottom: 1rem;
}

.f-group label {
    color: var(--g4);
    font-family: var(--fm);
    font-size: 0.6rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
}

.f-group input,
.f-group select,
.f-group textarea {
    border: 1px solid var(--g7);
    border-radius: var(--r);
    background: var(--off);
    padding: 0.9rem 1rem;
    font-size: 0.92rem;
    outline: none;
}

.full {
    width: 100%;
}

@media (max-width: 900px) {
    .contact-head,
    .c-grid,
    .f-row {
        grid-template-columns: 1fr;
    }
}

@media (max-width: 768px) {
    .site-nav,
    .si {
        padding-right: 1.5rem;
        padding-left: 1.5rem;
    }

    .nav-links {
        display: none;
    }

    .hamburger {
        display: inline-flex;
    }
}
</style>

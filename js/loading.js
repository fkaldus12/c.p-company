/* ========================================
   INTRO LOADING
   FAST CUT + POWERFUL LOGO
======================================== */

const intro = document.querySelector(".intro");

if (intro && window.gsap) {
    const texts = intro.querySelectorAll(".intro_text");

    const logo = intro.querySelector(".intro_logo");

    const logoLeft = intro.querySelector(".intro_logo-left");

    const logoRight = intro.querySelector(".intro_logo-right");

    /* ========================================
       01. SPEED
    ======================================== */
    const speed = {
        // 문구
        textIn: 0.1, // 나타나는 속도
        textStay: 0.2, // 화면에 머무는 시간
        textOut: 0.1, // 사라지는 속도

        // 로고
        logoIn: 0.32,
        logoStay: 0.32,

        // 로고 분리
        logoOpen: 0.4,

        // 메인 전환
        fadeOut: 0.25,
    };
    /* ========================================
       02. SCROLL STOP
    ======================================== */

    const originalOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";

    /* ========================================
       03. TEXT CONTENT
    ======================================== */

    // 기존 문구 저장
    const messages = Array.from(texts).map(function (text) {
        return text.textContent.trim();
    });

    // 하나의 텍스트 영역만 사용
    const textDisplay = texts[0];

    /* ========================================
       04. INITIAL STATE
    ======================================== */

    gsap.set(texts, {
        autoAlpha: 0,
    });

    gsap.set(textDisplay, {
        autoAlpha: 1,
    });

    gsap.set(logo, {
        autoAlpha: 0,
    });
    gsap.set([logoLeft, logoRight], {
        x: 0,
        opacity: 1,
    });

    /* ========================================
       05. TIMELINE
    ======================================== */

    const timeline = gsap.timeline({
        onComplete: function () {
            intro.remove();

            document.documentElement.style.overflow = originalOverflow;
        },
    });

    /* ========================================
   06. FAST TEXT CHANGE
======================================== */

    for (let i = 0; i < messages.length; i++) {
        // 문구 즉시 교체 (페이드 없음)
        timeline.call(function () {
            textDisplay.textContent = messages[i];
        });

        // 문구 유지
        timeline.to(
            {},
            {
                duration: speed.textStay,
            },
        );
    }

    /* ========================================
   07. SILENCE
======================================== */

    // 마지막 문구 즉시 제거
    timeline.set(textDisplay, {
        autoAlpha: 0,
    });

    // 잠깐 정적
    timeline.to(
        {},
        {
            duration: speed.silence,
        },
    );

    /* ========================================
   08. LOGO FADE IN
======================================== */

    // 로고만 자연스럽게 등장
    timeline.to(logo, {
        autoAlpha: 1,

        duration: speed.logoIn,

        ease: "power1.out",
    });

    /* ========================================
   09. LOGO HOLD
======================================== */

    // 중앙에서 정지
    timeline.to(
        {},
        {
            duration: speed.logoStay,
        },
    );

    /* ========================================
   10. LOGO EXPANSION
   SMOOTH & WEIGHTED
======================================== */

    // 왼쪽 로고
    timeline.to(logoLeft, {
        x: -(window.innerWidth + 200),

        duration: speed.logoOpen,

        ease: "power2.in",
    });

    // 오른쪽 로고
    timeline.to(
        logoRight,
        {
            x: window.innerWidth + 200,

            duration: speed.logoOpen,

            ease: "power2.in",
        },
        "<",
    );

    // 마지막 순간 자연스럽게 사라짐
    timeline.to(
        [logoLeft, logoRight],
        {
            opacity: 0,

            duration: 0.16,

            ease: "none",
        },
        "<+=0.46",
    );

    /* ========================================
   11. MAIN REVEAL
======================================== */

    timeline.to(intro, {
        opacity: 0,

        duration: speed.fadeOut,

        ease: "none",
    });

    /* ========================================
   11. MAIN REVEAL
======================================== */

    timeline.to(
        intro,
        {
            opacity: 0,

            duration: speed.fadeOut,

            ease: "none",
        },
        "-=0.05",
    );
}

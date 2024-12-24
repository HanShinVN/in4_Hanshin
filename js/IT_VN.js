document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);

    function typeEffect(element, delay = 100) {
        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = 1;

        text.split('').forEach((char, i) => {
            setTimeout(() => {
                element.textContent += char;
            }, i * delay);
        });
    }

    fetch("config.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể tải file config.json");
            }
            return response.json();
        })
        .then(config => {
            const webhookUrl = config.webhookUrl;
            const roomId = config.roomId;
            function sendDiscordNotification() {
                const payload = {
                    content: `Một người vừa truy cập vào website! Thời gian: ${new Date().toLocaleString()}`,
                    username: "Website Bot",
                };

                fetch(webhookUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                })
                // .then(response => {
                //     if (response.ok) {
                //         console.log("Thông báo đã được gửi đến Discord!");
                //     } else {
                //         console.error("Gửi thông báo thất bại:", response.statusText);
                //     }
                // })
                // .catch(error => {
                //     console.error("Lỗi khi gửi thông báo:", error);
                // });
            }
            sendDiscordNotification();
        })
        .catch(error => {
            console.error("Lỗi khi tải file JSON:", error);
        });


document.addEventListener("keydown", (e) => {
    if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
        alert("Chức năng này bị khóa!");
    }
});

document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    alert("Chuột phải đã bị vô hiệu hóa!");
});

    function revealOnScroll(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const visibleElements = entry.target.querySelectorAll('h3, p, ul li');
                visibleElements.forEach((el, index) => {
                    setTimeout(() => {
                        typeEffect(el, 50);
                    }, index * 300);
                });
                observer.unobserve(entry.target);
            }
        });
    }

    const observer = new IntersectionObserver(revealOnScroll, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });

    const sections = document.querySelectorAll('.about-me, .additional-info, .projects');
    sections.forEach(section => {
        observer.observe(section);
    });




    const elements = document.querySelectorAll(
        ".profile, .about-me, .additional-info, .projects, .socials, .footer"
    );

    elements.forEach((el, index) => {
        el.style.opacity = 0;
        el.style.transform = "translateY(50px) rotateX(15deg)";
        el.style.transition = `opacity 0.8s ease ${index * 0.3}s, transform 0.8s ease ${index * 0.3}s`;
    });

    setTimeout(() => {
        elements.forEach((el) => {
            el.style.opacity = 1;
            el.style.transform = "translateY(0) rotateX(0)";
        });
    }, 100);

    const profilePic = document.querySelector(".profile-pic");
    if (profilePic) {
        profilePic.addEventListener("mouseenter", () => {
            profilePic.style.transform = "scale(1.1) rotate(10deg)";
            profilePic.style.transition = "transform 0.3s ease";
        });

        profilePic.addEventListener("mouseleave", () => {
            profilePic.style.transform = "scale(1) rotate(0)";
        });
    }
    const socials = document.querySelectorAll(".socials a");
    socials.forEach((social) => {
        social.addEventListener("mouseenter", () => {
            social.style.color = "#d4af37";
            social.style.transform = "rotateY(360deg)";
            social.style.transition = "color 0.3s ease, transform 0.8s ease";
        });

        social.addEventListener("mouseleave", () => {
            social.style.color = "#FFD700";
            social.style.transform = "rotateY(0deg)";
        });
    });

    const buttons = document.querySelectorAll(".button a");
    buttons.forEach((button) => {
        button.style.opacity = 0;
        button.style.transform = "translateY(50px)";
        button.style.transition = "opacity 0.8s ease 1.5s, transform 0.8s ease 1.5s";

        setTimeout(() => {
            button.style.opacity = 1;
            button.style.transform = "translateY(0)";
        }, 100);

        button.addEventListener("mouseenter", () => {
            button.style.transform = "scale(1.1) rotateZ(5deg)";
            button.style.transition = "transform 0.3s ease";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "scale(1) rotateZ(0)";
        });
    });

    function createNeonPixels() {
        const container = document.createElement("div");
        container.style.position = "fixed";
        container.style.top = 0;
        container.style.left = 0;
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.overflow = "hidden";
        container.style.zIndex = -1;
        document.body.appendChild(container);

        for (let i = 0; i < 100; i++) {
            const pixel = document.createElement("div");
            pixel.style.position = "absolute";
            pixel.style.width = "5px";
            pixel.style.height = "5px";
            pixel.style.backgroundColor = "rgba(10, 255, 239, 0.5)";
            pixel.style.borderRadius = "50%";
            pixel.style.boxShadow = "0 0 5px rgba(10, 255, 239, 0.8), 0 0 10px rgba(0, 204, 204, 0.6)";
            pixel.style.bottom = `${Math.random() * 100}vh`;
            pixel.style.left = `${Math.random() * 100}%`;
            pixel.style.animation = `pixelRise ${5 + Math.random() * 5}s linear infinite`;
            container.appendChild(pixel);
        }
    }

    createNeonPixels();

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes pixelRise {
            from {
                transform: translateY(100vh);
                opacity: 1;
            }
            to {
                transform: translateY(-10vh);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(styleSheet);


    

// Phát hiện DevTools
function isDevToolsOpen() {
    let devtools = false;
    const threshold = 160;
    const startTime = performance.now();
    // debugger;
    const endTime = performance.now();

    if (endTime - startTime > threshold) {
        devtools = true;
    }

    const element = new Image();
    Object.defineProperty(element, 'id', {
        get: function () {
            devtools = true;
        }
    });
    console.log(element);

    return devtools;
}

setInterval(() => {
    if (isDevToolsOpen()) {
        alert("Bạn không được phép sử dụng DevTools trên trang này!");
        window.location.href = "https://www.google.com";
    }
}, 1000);

window.onbeforeunload = function () {
    localStorage.setItem("devtoolsCheck", "true");
};

window.onload = function () {
    if (localStorage.getItem("devtoolsCheck") === "true") {
        if (isDevToolsOpen()) {
            alert("DevTools đã bị phát hiện, bạn không được phép truy cập!");
            window.location.href = "https://www.google.com/";
        }
        localStorage.removeItem("devtoolsCheck");
    }
};

});

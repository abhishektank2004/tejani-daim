// Login eye-icon hide show start

function TogglePassword(params) {

    var passwordInput = document.getElementById("login_password");
    var eyeIcon = document.getElementById("eye-icon");
    console.log(base_url);
    if (passwordInput.type == "password") {
        passwordInput.type = "text";
        eyeIcon.src = base_url + "siteassets/images/landing_images/close-eye.png"; // Change to your close eye icon path
    } else {
        passwordInput.type = "password";
        eyeIcon.src = base_url + "siteassets/images/landing_images/open-eye.svg"; // Change to your close eye icon path

        // eyeIcon.src = "./asstes/images/png/open-eye.svg"; // Change to your open eye icon path
    }

}

// Login eye-icon hide show end
// Opt js start

let digitValidate = function (ele) {
    console.log(ele.value);
    ele.value = ele.value.replace(/[^0-9]/g, '');
}

let tabChange = function (val) {
    let ele = document.querySelectorAll('input');
    if (ele[val - 1].value != '') {
        ele[val].focus()
    } else if (ele[val - 1].value == '') {
        ele[val - 2].focus()
    }
}

// Opt js end

// $('.hero-banner').owlCarousel({
//     loop: true,
//     margin: 0,
//     nav: false, // Disable navigation if not needed
//     autoplay: true, // Enable autoplay
//     autoplayTimeout: 3000, // Set autoplay interval in milliseconds (3 seconds in this example)
//     responsive: {
//         0: {
//             items: 1
//         }
//     }
// });

$(".hero-banner").owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 4000, // Adjust autoplay timeout as needed
    // autoplayHoverPause: true,
    // animateIn: 'fadeIn', // Use fadeIn animation for transition
    animateOut: 'fadeOut', // Use fadeOut animation for transition
    dots: false,
    nav: false,
    mouseDrag: false,      // Disable dragging
    touchDrag: false       // Disable touch swiping
});


// Our Shapes
$('.our-shapes').owlCarousel({
    loop: true,
    // margin:,
    nav: true,
    dots: false,
    autoplay: true, // Enable autoplay
    autoplayTimeout: 3000, // Set autoplay interval in milliseconds (3 seconds in this example)
    responsive: {
        0: {
            items: 1
        },

        768: {
            items: 1
        },

        1024: {
            items: 2
        },

        1440: {
            items: 3
        },

        1660: {
            items: 4
        }
    }
})
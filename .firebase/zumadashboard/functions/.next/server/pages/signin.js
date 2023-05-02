"use strict";
(() => {
var exports = {};
exports.id = 176;
exports.ids = [176];
exports.modules = {

/***/ 824:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Login),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: external "next-auth/react"
var react_ = __webpack_require__(649);
;// CONCATENATED MODULE: external "@fortawesome/react-fontawesome"
const react_fontawesome_namespaceObject = require("@fortawesome/react-fontawesome");
;// CONCATENATED MODULE: external "@fortawesome/free-solid-svg-icons"
const free_solid_svg_icons_namespaceObject = require("@fortawesome/free-solid-svg-icons");
;// CONCATENATED MODULE: ./src/pages/signin.js





function Login() {
    const [formData, setFormData] = (0,external_react_.useState)({
        password: "",
        email: "",
        showPassword: true
    });
    const handleSubmit = async (e)=>{
        e.preventDefault();
        await (0,react_.signIn)("credentials", {
            redirect: true,
            email: formData.email,
            password: formData.password,
            callbackUrl: "/"
        }); // Replace this with your form submission logic
    };
    const TogglePasswordVisibility = ()=>{
        setFormData({
            ...formData,
            showPassword: !formData.showPassword
        });
    };
    const passwordInputType = formData.showPassword ? "password" : "text";
    const passwordIcon = formData.showPassword ? free_solid_svg_icons_namespaceObject.faEyeSlash : free_solid_svg_icons_namespaceObject.faEye;
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "w-screen h-screen bg-zuma-green flex justify-center items-center",
            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
                onSubmit: handleSubmit,
                className: "max-w-md",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "max-w-md flex flex-col items-center justify-center mb-20",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "text-zuma-login text-8xl font-bold",
                            children: "ZUMA"
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                        className: "text-2xl font-bold mb-8",
                        children: "Sign in to your admin dashboard!"
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                htmlFor: "email",
                                className: "block font-bold mb-2",
                                children: "Email"
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                type: "email",
                                id: "email",
                                name: "email",
                                value: formData.name,
                                onChange: (e)=>{
                                    setFormData({
                                        ...formData,
                                        email: e.target.value
                                    });
                                },
                                className: "w-full border-2 border-zuma-login/50 p-2 rounded-md text-black"
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                        className: "mb-4",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("label", {
                                htmlFor: "password",
                                className: "block font-bold mb-2",
                                children: "Password"
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                        type: passwordInputType,
                                        id: "password",
                                        name: "password",
                                        value: formData.password,
                                        onChange: (e)=>{
                                            setFormData({
                                                ...formData,
                                                password: e.target.value
                                            });
                                        },
                                        className: "w-full border-2 border-zuma-login/50  p-2 rounded-md text-black pr-10"
                                    }),
                                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        type: "button",
                                        className: "absolute right-2 top-2 h-8 w-8 flex items-center justify-center text-gray-500 hover:text-gray-700",
                                        onClick: TogglePasswordVisibility,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_namespaceObject.FontAwesomeIcon, {
                                            icon: passwordIcon
                                        })
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("button", {
                        type: "submit",
                        className: "bg-gradient-to-b from-orange-400 to-orange-600/80 hover:to-orange-500/80text-white py-2 px-4 rounded-md hover:bg-blue-600",
                        children: "Sign in with credentials"
                    })
                ]
            })
        })
    });
}
async function getServerSideProps(context) {
    const session = await (0,react_.getSession)(context);
    // If user has an active session, redirect to home page
    if (session && session.accessToken) {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        };
    }
    // If user does not have a session, continue rendering the login page
    return {
        props: {}
    };
}


/***/ }),

/***/ 649:
/***/ ((module) => {

module.exports = require("next-auth/react");

/***/ }),

/***/ 689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(824));
module.exports = __webpack_exports__;

})();
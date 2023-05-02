"use strict";
(() => {
var exports = {};
exports.id = 748;
exports.ids = [748];
exports.modules = {

/***/ 197:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _nextauth_)
});

;// CONCATENATED MODULE: external "next-auth"
const external_next_auth_namespaceObject = require("next-auth");
var external_next_auth_default = /*#__PURE__*/__webpack_require__.n(external_next_auth_namespaceObject);
;// CONCATENATED MODULE: external "next-auth/providers/credentials"
const credentials_namespaceObject = require("next-auth/providers/credentials");
var credentials_default = /*#__PURE__*/__webpack_require__.n(credentials_namespaceObject);
;// CONCATENATED MODULE: ./src/pages/api/auth/[...nextauth].js


const sign_in = async (args)=>{
    const data = JSON.stringify({
        email: args.email,
        password: args.password
    });
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": data.length
        },
        body: data,
        mode: "cors",
        credentials: "include"
    };
    const response = await fetch(`${process.env.AUTH_SERVER_URL}/signin`, options);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseData = await response.json();
    return responseData;
};
/* harmony default export */ const _nextauth_ = (external_next_auth_default()({
    secret: "f722820f40920467ada1c915bc260c321adce0142fe96b12e293addf9694faea",
    providers: [
        credentials_default()({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                email: {
                    label: "Username",
                    type: "email",
                    placeholder: "example@gmail.com"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const user = await sign_in({
                    email: credentials.email,
                    password: credentials.password
                });
                if (user) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user;
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null;
                // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        })
    ],
    callbacks: {
        jwt: ({ token , user  })=>{
            if (user) {
                token.id = user.EMPLOYEE_ID;
                token.user = user;
            }
            return token;
        },
        session: ({ session , token  })=>{
            if (token && token.user) {
                session.user_json_data = token.user;
                session.id = token.id;
            }
            return session;
        }
    },
    jwt: {
        secret: "f722820f40920467ada1c915bc260c321adce0142fe96b12e293addf9694faea",
        encryption: true
    },
    pages: {
        // signIn: "path" to create custom sign in page =>>>
        signIn: "/signin"
    }
}));


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(197));
module.exports = __webpack_exports__;

})();
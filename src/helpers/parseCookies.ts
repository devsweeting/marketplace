<<<<<<< HEAD
// import cookie from 'cookie';
// export function parseCookies(req: { cookies: Record<string, string>; headers: { cookie: any; }; }) {
//     req.cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie);
// }
=======
import cookie from 'cookie';
export function parseCookies(req: { cookies: Record<string, string>; headers: { cookie: any; }; }) {
    req.cookies = cookie.parse(req ? req.headers.cookie || '' : document.cookie);
}
>>>>>>> b94b05a (Logic for serverside cookies)

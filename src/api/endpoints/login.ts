import cookie from 'cookie';

export const login = (req: { body: { token: string; }; }, res: { setHeader: (arg0: string, arg1: string) => void; status: (arg0: number) => void; json: (arg0: { success: boolean; }) => void; }) => {
    res.setHeader('Set-Cookie', cookie.serialize('token', req.body.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: 'strict',
        path: '/',
    }));
    res.status(200)
    res.json({
        success: true,
    })
}

import * as React from 'react';
import { useRouter } from "next/router"
import OpenGraph from "@/components/OpenGraph"
import { Container} from "@mui/material"
import { ParsedUrlQuery } from 'querystring';
import { parseCookies } from '@/helpers/parseCookies';

const Login = ({token}) => {
    const { query } = useRouter()
    const [response, setReponse] = React.useState<number | null>(null)
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)
    const fetchTokenStatus = async (query: ParsedUrlQuery) => {
        if(query.token) {
            const authBody = {
                token: query.token,
                metadata: {
                    ipAddress: '',
                    browserUserAgent: '',
                    localeInformation: ''
                }
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/confirm`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${query.ßtoken}`
                },
                body: JSON.stringify(authBody)
        })
            const data = await res
            return data 
        }
        return
    }

    const sendLoginToken = async () => {
       const res = await fetch("/api/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                token: token

        })
    }
    )
        const data = await res
        return data
}
    React.useEffect(() => {
        fetchTokenStatus(query)
        .then((data) => {
            if(data) {
                setReponse(data.status)
            }
        })
    }, [query])
   
    return (
        <>
            <OpenGraph title={'Login'} description={'Login page description'} />
            <Container style={{height: '90vh', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}} maxWidth="xl">
                <div style={{display: 'flex', flexFlow: 'column', borderRadius: '4px', boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.2)', height: '25%', width: '25%', justifyContent: 'center', alignItems: 'center'}}>
                {response === 200 ? <h2>Login Successful</h2> : <h2>Login Failed</h2>}
                {response === 400 && <p>Invalid token</p>}
                {response === 200 ? <p>You can now close this window</p> : <p>Please try again</p>}
                </div>
            </Container>
        </>
    )
}

export default Login

export const getServerSideProps = async (req: any, res: any) => {
const cookies = parseCookies(req)
    return {
        props: {
            token: cookies
        }
    }
}
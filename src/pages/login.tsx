import * as React from 'react';
import { useRouter } from 'next/router';
// eslint-disable-next-line import/no-unresolved
import { OpenGraph } from '@/components/OpenGraph';
import { Container } from '@mui/material';
import type { ParsedUrlQuery } from 'querystring';

<<<<<<< HEAD
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
                  'Authorization': `Bearer ${query.token}`
                },
                body: JSON.stringify(authBody)
        })
            const data = await res
            return data 
        }
        return
    }
    return;
  };

//     const sendLoginToken = async () => {
//        const res = await fetch("/api/authenticate", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 token: token

//         })
//     }
//     )
//         const data = await res
//         return data
// }
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
=======
const fetchTokenStatus = async (query: ParsedUrlQuery) => {
  if (query.token) {
    const authBody = {
      token: query.token,
      metadata: {
        ipAddress: '',
        browserUserAgent: '',
        localeInformation: '',
      },
    };
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authBody),
    });
    const data = await response;
    if (data.status === 200) {
      const token = {
        token: await data.text(),
      };
      console.log(token);
      const apiResponse = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
      });
      const apiData = await apiResponse;
      if (apiData.status === 200) {
        return 'success';
      }
    }
    if (data.status === 401 || data.status === 400) {
      return data.json();
    }
  }
  return null;
};

const Login = () => {
  const { query } = useRouter();
  React.useEffect(() => {
    fetchTokenStatus(query).then((data) => {
      if (data) {
        console.log(data);
      }
    });
  }, [query]);

  return (
    <>
      <OpenGraph title={'Login'} description={'Login page description'} />
      <Container
        style={{
          height: '90vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
        }}
        maxWidth="xl"
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
            borderRadius: '4px',
            boxShadow: ' 0 3px 10px rgb(0 0 0 / 0.2)',
            height: '25%',
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></div>
      </Container>
    </>
  );
};
>>>>>>> 970b77e (Setting session cookie)

export default Login;

const getServerSideProps = async (ctx) => {};

import { Avatar, Button } from "@mui/material";
import { useRouter } from 'next/router'

export default function Header({ session }) {
  const menu = [
    {
      path: '/clients',
      name: 'Clients'
    },
    {
      path: '/events',
      name: 'Events'
    }
  ]
  const router = useRouter()
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '12px' }}>
      <div onClick={() => router.push('/')}>
        CoachApp
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: '12px' }}>
        <div>
          {menu.map((x,i) => (
            <Button key={i} onClick={() => router.push(x.path)}>{x.name}</Button>
          ))}
        </div>
        <Avatar sx={{ bgcolor: 'lightblue' }}>
          {session.user.email[0]}
        </Avatar>
      </div>
    </div>
  )
}
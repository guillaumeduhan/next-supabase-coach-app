import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Button, Card, Grid, CardContent, CardActions } from "@mui/material";
import { supabase } from '../../utils/supabaseClient'

export default function Clients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const deleteClient = async (id) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)

      setClients(clients.filter(x => x.id !== id))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchClients = async () => {
    try {
      setLoading(true)
      let { data: clients, error } = await supabase
        .from('clients')
        .select()

      if (clients) {
        setClients(clients)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients();
  }, [])

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h1>List of clients</h1>
        <Button onClick={() => router.push('/clients/new')}>Add a new client</Button>
      </header>
      {loading ? (
        <p>Loading...</p>
      ): (
        <Grid container flex rowSpacing={1}>
          {clients.map((x, i) => (
            <Grid key={i} item md={12}>
              <Card>
                <CardContent>
                  <span>{x.name}</span>
                </CardContent>
                <CardActions>
                  <Button size="small" color="error" onClick={() => deleteClient(x.id)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}
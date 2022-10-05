import dayjs from 'dayjs'
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { Button, Card, Grid, CardContent, CardActions } from "@mui/material";
import { supabase } from '../../utils/supabaseClient'

export default function Events() {
  const [clients, setClients] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const deleteEvent = async (id) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('events')
        .delete()
        .eq('id', id)

      setEvents(events.filter(x => x.id !== id))
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

  const fetchEvents = async () => {
    try {
      setLoading(true)
      let { data: events, error } = await supabase
        .from('events')
        .select(`
          *,
          clients (
            name
          )
        `)

      if (events) {
        console.log(events)
        setEvents(events)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // fetchClients();
    fetchEvents();
  }, [])

  return (
    <div>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h1>List of events</h1>
        <Button onClick={() => router.push('/events/new')}>Add a new event</Button>
      </header>
      {loading ? (
        <p>Loading...</p>
      ): (
        <Grid container flex rowSpacing={1}>
          {events.map((x, i) => (
            <Grid key={i} item md={12}>
              <Card>
                <CardContent>
                  <span>{dayjs(x.date).format('MM/DD/YYYY hh:mm')} — {x.clients.name}</span>
                </CardContent>
                <CardActions>
                  <Button size="small" color="error" onClick={() => deleteEvent(x.id)}>Delete</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  )
}
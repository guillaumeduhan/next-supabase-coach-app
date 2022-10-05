import dayjs from 'dayjs';
import { LoadingButton } from "@mui/lab";
import { Button, Grid, Select, TextField, MenuItem } from "@mui/material";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import { supabase } from '../../utils/supabaseClient'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export default function NewEvent() {
  const router = useRouter()
  const [clientId, setClientId] = useState('')
  const [newDate, setNewDate] = useState(dayjs('2022-08-18T21:11:54'))
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(false)

  const saveNewEvent = async () => {
    try {
      setLoading(true)
      if (!clientId || !newDate) {
        return 
      }
      const { data, error } = await supabase
        .from('events')
        .insert({
          client_id: clientId,
          date: newDate // timestamp
        })
        router.push('/events')
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
        console.log(clients)
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
      <h2>Add a new event</h2>
      <Grid container flex rowSpacing={1}>
        <Grid item md={12}>
          <Select
            labelId="clientIdLabel"
            id="clientIdLabel"
            value={clientId}
            label="Select a client"
            onChange={(e) => setClientId(e.target.value)}
          >
            {clients.map((x,i) => (
              <MenuItem key={i} value={x.id}>
                <span>{x.name}</span>
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item md={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Date & Time picker"
              value={newDate}
              onChange={(e) => setNewDate(e)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item md={12}>
          {loading ? 
            (<LoadingButton loading />) : (
              <Button variant="contained" onClick={() => saveNewEvent()}>Save new event</Button>
            )
          }
        </Grid>
      </Grid>
    </div>
  )
}
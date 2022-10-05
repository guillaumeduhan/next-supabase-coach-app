import { LoadingButton } from "@mui/lab";
import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from 'next/router'
import { useState } from "react";
import { supabase } from '../../utils/supabaseClient'

export default function NewClient() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const saveNewClient = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('clients')
        .insert({
          name
        })
        router.push('/clients')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h2>Add a new client</h2>
      <Grid container flex rowSpacing={1}>
        <Grid item md={12}>
          <TextField id="outlined-basic" label="My new client's name" variant="outlined" onChange={(e) => setName(e.target.value)} />
        </Grid>
        <Grid item md={12}>
          {loading ? 
            (<LoadingButton loading />) : (
              <Button variant="contained" onClick={() => saveNewClient()}>Save new client</Button>
            )
          }
        </Grid>
      </Grid>
    </div>
  )
}
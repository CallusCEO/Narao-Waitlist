import { supabase } from '@/utils/supabase';

export async function POST(request: Request) {
  const { email, name, status } = await request.json();

  if (!email) {
    return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
  }
  
  if (!name) {
    return new Response(JSON.stringify({ error: 'Name is required' }), { status: 400 });
  }

  const { data, error } = await supabase
    .from('waiting_list')
    .insert([
      { 
        email: email,
        name: name,
        status: status 
      },
    ]);

  if (error) {
    console.error('Error saving to Supabase:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'Successfully joined the waiting list!' }), { status: 200 });
}
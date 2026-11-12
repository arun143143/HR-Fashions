-- Every new Supabase Auth user gets a customer profile.
create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function private.handle_new_user();

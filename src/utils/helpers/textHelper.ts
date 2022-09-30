export const getInitials = (name ?: string) => {
  name = name || 'Fleet Max';
  if(name) {
  const [firstName, lastName] = name.split(' ');
  let str = `${firstName?.[0]}${lastName?.[0] || ''}`;
  return str.toUpperCase();
  }
}
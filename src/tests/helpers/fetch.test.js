import { fetchWithoutToken, fetchWithToken } from '../../helpers/fetch';

describe('Fetch helper Test', () => {
  let token = '';

  test('fetch without token should works', async () => {
    const res = await fetchWithoutToken(
      'auth',
      { email: 'user@mail.com', password: '123ABC' },
      'POST',
    );
    expect(res instanceof Response);

    const body = await res.json();
    expect(body.ok).toBe(true);

    token = body.token;
  });

  test('fetch with token should works', async () => {
    localStorage.setItem('token', token);

    const res = await fetchWithToken('events/624b6000b6743332345f270d', {}, 'DELETE');
    const body = await res.json();

    expect(body.msg).toBe('Event not found');
  });
});

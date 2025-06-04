export async function findUserByPhoneNumber(phone) {
  // Simulated database lookup
  const fakeDB = [
    { name: 'John', phone: '14155552671' },
    { name: 'Jane', phone: '14155550000' }
    { name: 'AdamPe', phone: '48786189122' }
  ];

  return fakeDB.find(user => user.phone === phone);
}
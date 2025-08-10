export default function MealsLayout({ children }) {
  return (
    <main>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Meals</h1>
      <p style={{ textAlign: 'center' }}>
        This is the Meals Layout. It wraps around all meals pages.
      </p>
      {children}
    </main>
  );
}
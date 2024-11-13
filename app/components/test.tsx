function App() {
  return <Card />
}

function Card() {
  return (
    <>
      <CardHeader />
      <CardContent />
      <CardFooter />
    </>
  )
}

function CardHeader() {
  const sumar = () => {}
  return <button onClick={() => sumar()}>Sumar</button>
}

function CardContent() {
    
  return <></>
}

function CardFooter() {
  return <></>
}

import { useEffect, useState } from 'react'

const Count = () => {
  const [minutos, setMinutos] = useState('0')
  const [segundos, setsSegundos] = useState('0')
  useEffect(() => {
    count()
  }, [])
  function count() {
    let totalSeconds = 0
    setInterval(setTime, 1000)

    function setTime() {
      ++totalSeconds
      setsSegundos(pad(totalSeconds % 60))
      setMinutos(pad(parseInt((totalSeconds / 60).toString())))
    }

    function pad(val: number) {
      const valString = val + ''
      if (valString.length < 2) {
        return '0' + valString
      } else {
        return valString
      }
    }
  }
  return (
    <div>
      <label id="minutes">{minutos}</label>
      <label id="colon">:</label>
      <label id="seconds">{segundos}</label>
    </div>
  )
}

export default Count

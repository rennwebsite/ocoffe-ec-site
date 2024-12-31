import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

const Kalender = () => {
  const [value, setValue] = useState(new Date())

  const handleDateClick = (date) => {
    const formattedDate = date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    })
    setValue(date)
  }

  return (
    <>
      <Calendar
        onClickDay={handleDateClick}
        value={value}
        tileClassName={({ date, view }) => {
          if (view === 'month') {
            const isToday = date.toDateString() === new Date().toDateString()
            return isToday ? 'bg-today' : 'bg-transparent'
          }
          return null
        }}
        className='custom-calendar'
      />
      {/* Custom Style */}
      <style>{`
        /* Kalender */
        .custom-calendar {
          background: transparent; /* Background kalender transparan */
          border: none;
          box-shadow: none;
          
        }

        /* Judul Kalender (bulan dan tahun seperti "Desember 2024") */
        .custom-calendar .react-calendar__navigation {
          background: transparent; /* Judul transparan */
          color: #333; /* Warna teks tetap terlihat */
        }

        /* Tombol Navigasi (Prev dan Next) */
        .custom-calendar .react-calendar__navigation button {
          background-color: transparent; /* Tombol transparan */
          color: #333; /* Warna teks */
          border: none;
        }

        .custom-calendar .react-calendar__navigation button:hover {
          background-color: rgba(
            200,
            200,
            200,
            0.3
          ); /* Hover dengan sedikit transparansi */
          
        }

        /* Semua tanggal transparan */
        .bg-transparent {
          background-color: transparent !important;
        }
        
         .bg-transparent:hover {
          background-color: rgba(145,145,145,0.2) !important;
          border-radius: 50%;
          
         }

        /* Hari ini */
        .bg-today {
          background-color: #9580F7 !important; /* Kuning untuk hari ini */
          color: white !important;
          border-radius: 50%; /* Membuat hari ini bulat */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Memberikan shadow */
        }

        /* Hover pada tanggal */
        .custom-calendar .react-calendar__tile:hover {
          background-color: rgba(145,145,145,0.5);
          
        }
      `}</style>
    </>
  )
}

export default Kalender

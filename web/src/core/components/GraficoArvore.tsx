'use client'

import React from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false })
interface GraficoArvoreProps {
  series: any[]
}
const GraficoArvore = (props: GraficoArvoreProps) => {
  return (
    <div>
      {typeof window !== 'undefined' && (
        <Chart
          options={{
            legend: {
              show: true,
            },
            colors: ['#005000'],
            yaxis: {
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: true,
                formatter: function (val) {
                  return val.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })
                },
              },
            },
            chart: {
              type: 'treemap',
            },
          }}
          series={[{ data: props.series }]}
          type="treemap"
        />
      )}
    </div>
  )
}

export default GraficoArvore

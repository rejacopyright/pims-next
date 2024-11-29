// API: https://github.com/react-component/image
// DEMO: https://image-sepia.vercel.app

import Image from 'rc-image'
import { FC, useState } from 'react'

import { defaultIcons } from './common'

interface Props {
  items: string[]
  render?: any
}

const Index: FC<Props> = ({ items, render: _render }) => {
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)

  return (
    <Image.PreviewGroup
      items={items}
      preview={{
        icons: defaultIcons,
        visible,
        onVisibleChange: setVisible,
        current,
        onChange: setCurrent,
      }}>
      {items?.map((item: any, index: number) => {
        // // const El: any = render ? render(item, index) : {}
        // const El: any = render(item, index)
        // // typeof El?.[item] === 'function' ? El?.[item]?.() : El?.[item]
        // if (typeof El?.[item] === 'function') {
        //   return (
        //     <div
        //       key={index}
        //       onClick={() => {
        //         setCurrent(index)
        //         setVisible(true)
        //       }}>
        //       {El?.[item]?.()}
        //     </div>
        //   )
        // } else {
        //   return (
        //     <div
        //       key={index}
        //       onClick={() => {
        //         setCurrent(index)
        //         setVisible(true)
        //       }}>
        //       {El?.[item]}
        //     </div>
        //   )
        // }
        return (
          <div key={index} className='col-12 p-0 fs-16px fw-bold'>
            <div className='row m-0 align-items-center gap-13px'>
              <div className='col-auto h-auto px-10px' style={{ width: '300px' }}>
                <div
                  className='w-100 bg-gray-200'
                  onClick={() => {
                    setCurrent(index)
                    setVisible(true)
                  }}
                  style={{
                    background: `url(${item}) center / contain no-repeat`,
                    minHeight: '150px',
                    maxHeight: '300px',
                  }}>
                  {/* <Image
                    src={item?.id}
                    // src={`https://i.pinimg.com/originals/39/a3/dc/39a3dcbd4d2d66405ba59818028855b6.jpg`}
                    wrapperStyle={{
                      width: '100%',
                      maxHeight: '300px',
                    }}
                  /> */}
                </div>
              </div>
              <div className='col p-0'>{item?.caption?.split('\\n')?.join('\n')}</div>
            </div>
          </div>
        )
      })}
    </Image.PreviewGroup>
  )
}

export default Index

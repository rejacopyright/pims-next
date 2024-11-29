import 'react-loading-skeleton/dist/skeleton.css'

import { randomString } from '@helpers'
import { FC } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export const TextLoader: FC<any> = ({ count = 3, height = 25, className = '' }) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 &&
        Array(count)
          .fill(count)
          .map(() => {
            const random: number = Math.floor(Math.random() * 5) + 2 // random 20% to 50%
            return (
              <div className={`row ${className}`} key={randomString()}>
                <div className='col'>
                  <div className='col-12 m-0' style={{ lineHeight: height / 1.25 + 'px' }}>
                    <Skeleton
                      className='my-0'
                      width={random * 10 + '%'}
                      height={height / 3}
                      count={1}
                    />
                  </div>
                  <div className='col-12 m-0' style={{ lineHeight: height / 1.25 + 'px' }}>
                    <Skeleton className='my-0' height={height} count={1} />
                  </div>
                </div>
              </div>
            )
          })}
    </SkeletonTheme>
  )
}

export const ListLoader: FC<any> = ({ count = 3, height = 25, className = '' }) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 &&
        Array(count)
          ?.fill(count)
          ?.map(() => {
            const random: number = Math.floor(Math.random() * 5) + 2 // random 20% to 50%
            return (
              <div key={randomString()} className={`row ${className}`}>
                <div className='col-auto' style={{ lineHeight: height / 1.25 + 'px' }}>
                  <Skeleton className='my-0' width={height} height={height} count={1} circle />
                </div>
                <div className='col'>
                  <div className='row'>
                    <div className='col-12 m-0' style={{ lineHeight: height / 1.25 + 'px' }}>
                      <Skeleton
                        className='my-0'
                        width={random * 10 + '%'}
                        height={height / 3}
                        count={1}
                      />
                    </div>
                    <div className='col-12 m-0' style={{ lineHeight: height / 1.25 + 'px' }}>
                      <Skeleton className='my-0' height={height} count={1} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
    </SkeletonTheme>
  )
}

export const CardLoader: FC<any> = ({ count = 3, height = 100, className = '', icon = true }) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 &&
        Array(count)
          .fill(count)
          .map(() => {
            const random: number = Math.floor(Math.random() * 5) + 2 // random 20% to 50%
            return (
              <div className={className} key={randomString()}>
                <div className='row'>
                  <div className='col-12 mb-1' style={{ lineHeight: '20px' }}>
                    <div className='row align-items-center'>
                      {icon && (
                        <div className='col-auto' style={{ lineHeight: '15px' }}>
                          <Skeleton className='my-0' width={30} height={30} count={1} circle />
                        </div>
                      )}
                      <div className={`col ${icon ? 'ps-0' : ''}`} style={{ lineHeight: '15px' }}>
                        <Skeleton
                          className='my-0'
                          width={random * 10 + '%'}
                          height={10}
                          count={1}
                        />
                        <Skeleton className='my-0' height={10} count={1} />
                      </div>
                    </div>
                  </div>
                  <div className='col-12 m-0' style={{ lineHeight: '20px' }}>
                    <Skeleton className='my-0 radius-10' height={height} count={1} />
                  </div>
                </div>
              </div>
            )
          })}
    </SkeletonTheme>
  )
}

export const CircleLoader: FC<any> = ({ count = 1, size = 50, className = '' }) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      {count > 0 &&
        Array(count)
          ?.fill(count)
          ?.map(() => (
            <div className={className} key={randomString()}>
              <div className='row'>
                <div className='col-12 m-0'>
                  <Skeleton className='my-0' width={size} height={size} count={1} circle={true} />
                </div>
              </div>
            </div>
          ))}
    </SkeletonTheme>
  )
}

export const SimpleLoader: FC<any> = ({
  count = 3,
  height = 25,
  width = '',
  circle = false,
  className = '',
  baseColor = '#f5f5f5',
  highlightColor = '#fafafa',
}) => {
  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {count > 0 &&
        Array(count)
          ?.fill(count)
          ?.map(() => {
            return (
              <div
                className={className}
                key={randomString()}
                style={{ lineHeight: height / 2 + 'px' }}>
                <Skeleton
                  className='my-0'
                  height={height}
                  width={width}
                  count={1}
                  circle={circle}
                />
              </div>
            )
          })}
    </SkeletonTheme>
  )
}

export const ProductLoader: FC<any> = ({
  count = 1,
  size = 100,
  itemClass = '',
  containerClass = '',
  circle = true,
}) => {
  return (
    <SkeletonTheme baseColor='#f5f5f5' highlightColor='#fafafa'>
      <div className={containerClass}>
        {count > 0 &&
          Array(count)
            ?.fill(count)
            ?.map(() => {
              return (
                <div className={itemClass} key={randomString()}>
                  <div className='border radius-15 p-4'>
                    <div className='row'>
                      <div className='col-12 text-center m-0 radius-100'>
                        <Skeleton
                          className='mt-0 mb-3 radius-100'
                          width={size}
                          height={size}
                          count={1}
                          circle={circle}
                        />
                      </div>
                      <div className='col-12 text-center m-0 mb-3'>
                        <Skeleton
                          className='mt-0 mb-2 radius-100'
                          height={15}
                          width={(Math.floor(Math.random() * 6) + 4) * 10 + '%'}
                        />
                        <Skeleton
                          className='mt-0 mb-2 radius-100'
                          height={15}
                          width={(Math.floor(Math.random() * 6) + 4) * 10 + '%'}
                        />
                      </div>
                      <div className='col-12 text-center m-0'>
                        <Skeleton
                          className='mt-0 mb-1 radius-100'
                          height={10}
                          width={(Math.floor(Math.random() * 4) + 2) * 10 + '%'}
                        />
                        <Skeleton
                          className='mt-0 mb-1 radius-100'
                          height={10}
                          width={(Math.floor(Math.random() * 4) + 2) * 10 + '%'}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
      </div>
    </SkeletonTheme>
  )
}

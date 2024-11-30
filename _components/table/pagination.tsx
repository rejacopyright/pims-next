import InputNumber from '@components/form/InputNumber'
import { FC, useEffect, useRef, useState } from 'react'

type Props = {
  limit?: any
  showLimit?: boolean
  showCount?: boolean
  total: any
  page?: any
  onChangeLimit?: any
  onChangePage?: any
}

const Generate: any = (n: any, f: any) => {
  return Array(n)
    ?.fill('')
    ?.map((_v: any, i: any) => (f || 1) + i)
}

const configClass: any = {
  btn: 'btn btn-icon d-flex flex-center overflow-hidden radius-50 fs-7 fw-600 w-30px h-30px',
  active: 'btn-primary',
  inActive: 'btn-light border text-gray-800',
  select: `form-select form-select-sm border border-gray-200 w-75px h-34px py-0`,
}

const InputPageNumberElement: FC<{ onApply?: (e: any) => void; max?: number }> = ({
  onApply = () => '',
  max = 1,
}) => {
  const inputRef = useRef<any>()
  const [inputMode, setInputMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<any>(undefined)

  useEffect(() => {
    if (inputRef?.current) {
      inputRef?.current?.focus()
    }
  }, [inputRef, inputMode])

  return (
    <form>
      {inputMode && (
        <div
          className='modal-backdrop show opacity-0x'
          style={{ zIndex: 0 }}
          onClick={() => {
            setInputMode(false)
            setInputValue(undefined)
          }}
        />
      )}
      {inputMode ? (
        <div className='d-flex align-items-center w-30px'>
          <div className='position-absolute input-group input-group-solid d-flex flex-nowrap align-items-center bg-white w-125px h-30px overflow-hidden'>
            <InputNumber
              ref={inputRef}
              placeholder=''
              min={0}
              max={max}
              minHeight={30}
              formClass='form-control form-control-sm form-control-solid text-dark fs-12px w-30px text-center border-0 py-0 px-5px'
              nullable
              onChange={(e: any) => {
                setInputValue(e ? parseInt(e) : undefined)
              }}
            />
            <button
              type='submit'
              className='btn btn-flex lh-1px btn-sm h-25px radius-5 mx-1 btn-primary'
              disabled={!inputValue}
              onClick={() => {
                onApply(inputValue)
                setInputMode(false)
                setInputValue(undefined)
              }}>
              Apply
            </button>
          </div>
        </div>
      ) : (
        <div
          className={`${configClass?.btn} overflow-hidden fs-7 fw-500`}
          onClick={() => setInputMode((prev: boolean) => !prev)}>
          <div className=''>...</div>
        </div>
      )}
    </form>
  )
}

const TablePagination: FC<Props> = ({
  total,
  page,
  limit,
  showLimit = true,
  showCount = true,
  onChangePage,
  onChangeLimit,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(Number(page) || 1)

  useEffect(() => {
    setCurrentPage(Number(page))
  }, [page])

  const end: any = currentPage * (limit || 1)
  const start: any = currentPage === 1 ? 1 : end + 1 - (limit || 1)
  const lastPage: any = Math.ceil(total / (limit || 1))

  const pageChange: any = (key: any) => {
    onChangePage(key)
    setCurrentPage(key)
  }

  return (
    <div className='row m-0 align-items-center border-top border-2 py-5'>
      <div className='col-12'>
        <div className='position-relative'>
          {showLimit && (
            <div className='position-absolute top-0 start-0'>
              <div className='fs-6 fw-bold text-gray-700'>
                <select
                  className={configClass?.select}
                  value={limit}
                  name='number_of_page'
                  onChange={({ target: { value } }) => {
                    onChangeLimit(parseInt(value))
                    setCurrentPage(1)
                  }}>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                  <option value='100'>100</option>
                </select>
              </div>
            </div>
          )}
          <div className={`flex-nowrap flex-center py-2px ${lastPage === 1 ? 'd-none' : 'd-flex'}`}>
            {((lastPage > 10 && currentPage >= 7) || (lastPage === 11 && currentPage === 6)) && (
              <>
                <div className='col-auto px-1'>
                  <button
                    type='button'
                    onClick={() => pageChange(1)}
                    className={`${configClass?.btn} ${
                      currentPage === 1 ? configClass?.active : configClass?.inActive
                    }`}>
                    1
                  </button>
                </div>
                <div className='col-auto px-1'>
                  <button
                    type='button'
                    onClick={() => pageChange(2)}
                    className={`${configClass?.btn} ${
                      currentPage === 2 ? configClass?.active : configClass?.inActive
                    }`}>
                    2
                  </button>
                </div>
                <div className='col-auto px-0'>
                  <InputPageNumberElement onApply={pageChange} max={lastPage} />
                </div>
              </>
            )}
            {lastPage > 10 && currentPage >= 7 && currentPage < lastPage - 5
              ? Generate(7, currentPage - 3)?.map((key: any) => (
                  <div className='col-auto px-1' key={key}>
                    <button
                      type='button'
                      onClick={() => pageChange(key)}
                      className={`${configClass?.btn} ${
                        currentPage === key ? configClass?.active : configClass?.inActive
                      }`}>
                      {key}
                    </button>
                  </div>
                ))
              : lastPage > 10 && currentPage >= lastPage - 5
                ? Generate(5, lastPage - 6)?.map((key: any) => (
                    <div className='col-auto px-1' key={key}>
                      <button
                        type='button'
                        onClick={() => pageChange(key)}
                        className={`${configClass?.btn} ${
                          currentPage === key ? configClass?.active : configClass?.inActive
                        }`}>
                        {key}
                      </button>
                    </div>
                  ))
                : Generate(lastPage > 10 ? 7 : lastPage)?.map((key: any) => (
                    <div className='col-auto px-1' key={key}>
                      <button
                        type='button'
                        onClick={() => pageChange(key)}
                        className={`${configClass?.btn} ${
                          currentPage === key ? configClass?.active : configClass?.inActive
                        }`}>
                        {key}
                      </button>
                    </div>
                  ))}
            {lastPage > 10 && (
              <>
                {currentPage < lastPage - 5 && (
                  <div className='col-auto px-0'>
                    <InputPageNumberElement onApply={pageChange} max={lastPage} />
                  </div>
                )}
                <div className='col-auto px-1'>
                  <button
                    type='button'
                    onClick={() => pageChange(lastPage - 1)}
                    className={`${configClass?.btn} ${
                      currentPage === lastPage - 1 ? configClass?.active : configClass?.inActive
                    }`}>
                    {lastPage - 1}
                  </button>
                </div>
                <div className='col-auto px-1'>
                  <button
                    type='button'
                    onClick={() => pageChange(lastPage)}
                    className={`${configClass?.btn} ${
                      currentPage === lastPage ? configClass?.active : configClass?.inActive
                    }`}>
                    {lastPage}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {showCount && total ? (
        <div className='col-12'>
          <div
            className={`d-flex align-items-center justify-content-center gap-3px text-gray-700 fs-12px ${lastPage === 1 ? 'h-40px' : 'mt-14px'}`}>
            <div className=''>Showing</div>
            <div className='fw-500 text-dark'>{start}</div>
            <div className=''>-</div>
            <div className='fw-500 text-dark'>{total < end ? total?.toString() : end}</div>
            <div className=''>from</div>
            <div className='fw-500 text-dark'>{total?.toString() || 0}</div>
          </div>
        </div>
      ) : (
        <div className='h-30px' />
      )}
    </div>
  )
}

export { TablePagination }

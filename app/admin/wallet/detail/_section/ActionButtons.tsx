'use client'
import { API_SERVER } from '@api/axios'
import { createShareURL, getBlockchainVerification } from '@api/badge'
import { KTSVG } from '@helpers'
import last from 'lodash/last'
import { FC, useEffect, useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { FacebookIcon, FacebookShareButton, TwitterShareButton, XIcon } from 'react-share'

import ModalShare from './ModalShare'
import ModalViewPDF from './ModalViewPDF'

interface Props {
  detailBadge: any
  shareIsLoading: boolean
}

const Index: FC<Props> = ({ detailBadge, shareIsLoading }) => {
  const [shareURL, setShareURL] = useState<any>(false)
  const [showModalShare, setShowModalShare] = useState<boolean>(false)

  const walletDetail: any = useSelector(({ wallet }: any) => wallet?.detail, shallowEqual)
  const { USER_ID, USER_BDG_ID, BIZ_MBR_ID, BDG_ID, CERT_FILE_NAME, NAME }: any = walletDetail || {}

  const achievement: any = detailBadge?.credentialSubject?.achievement || {}

  // PDF SCOPE
  const [showModalViewPDF, setShowModalViewPDF] = useState<boolean>(false)

  // BLOCKCHAIN SCOPE
  const [blockchainBtnIsLoading, setBlockchainBtnIsLoading] = useState<boolean>(false)
  const [_blockchainStatus, setBlockchainStatus] = useState<any>({})

  const verifyBlockchain = () => {
    const params: any = {
      user_id: USER_ID,
      user_bdg_id: USER_BDG_ID,
      biz_mbr_id: BIZ_MBR_ID,
      bdg_id: BDG_ID,
    }
    setBlockchainBtnIsLoading(true)
    getBlockchainVerification(params)
      .then(({ data }: any) => {
        const isSuccess: boolean = data?.message?.blockChainValidate?.reason === 'success'
        if (isSuccess) {
          setBlockchainStatus({ status: 'success', message: 'Verification success' })
        }
      })
      .catch((err: any) => {
        const message: any = err?.response?.data?.message?.reason || err?.message || ''
        setBlockchainStatus({ status: 'error', message })
      })
      .finally(() => setBlockchainBtnIsLoading(false))
  }

  useEffect(() => {
    if (USER_ID && USER_BDG_ID) {
      const shareURLParams: any = {
        user_id: USER_ID,
        user_bdg_id: USER_BDG_ID,
      }
      createShareURL(shareURLParams)
        .then(({ data }: any) => {
          const res: any = last(data?.message?.share_url?.split('/') || []) || undefined
          setShareURL(res)
        })
        .catch(() => '')
    }
  }, [USER_ID, USER_BDG_ID])

  return (
    <>
      <div className='d-flex flex-wrap gap-8px mt-24px'>
        <button
          type='button'
          className={`btn btn-white ${!CERT_FILE_NAME ? 'btn-disabled' : ''} text-dark btn-flex flex-center gap-6px border border-gray-300 radius-5 px-8px shadow-xs`}
          onClick={() => setShowModalViewPDF(true)}
          style={{ height: '36px' }}>
          <KTSVG path='/media/icons/custom/pdf.svg' width={24} height={24} className='m-0' />
          <div className='fs-14px fw-bold'>증명서</div>
        </button>
        {shareURL && (
          <>
            <FacebookShareButton
              title={detailBadge?.name}
              url={`https://pimsclub.id/public/user/badge/${shareURL}`}
              hashtag={'#OpenBadge #태권도'}
              className='btn btn-white text-dark btn-flex flex-center gap-6px border border-gray-300 radius-5 px-8px shadow-xs fw-bold'>
              <FacebookIcon size={22} round /> 페이스북
            </FacebookShareButton>
            <TwitterShareButton
              title={detailBadge?.name}
              url={`https://pimsclub.id/public/user/badge/${shareURL}`}
              hashtags={['OpenBadge', '태권도']}
              className='btn btn-white text-dark btn-flex flex-center gap-6px border border-gray-300 radius-5 px-8px shadow-xs fw-bold'>
              <XIcon size={22} round /> X(트위터)
            </TwitterShareButton>
          </>
        )}
        <button
          type='button'
          disabled={blockchainBtnIsLoading}
          className='d-none btn btn-white text-dark btn-flex flex-center border border-gray-300 radius-5 px-8px shadow-xs'
          onClick={verifyBlockchain}
          style={{ height: '36px' }}>
          <div className='fs-14px fw-bold'>
            {blockchainBtnIsLoading ? (
              <span className='indicator-progress' style={{ display: 'block' }}>
                Waiting...
                <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
              </span>
            ) : (
              <span>블록체인 증명서</span>
            )}
          </div>
        </button>
        <button
          type='button'
          disabled={!USER_BDG_ID}
          className='btn btn-primary text-dark btn-sm p-0 d-flex flex-center border border-white radius-5 shadow-xs'
          onClick={() => setShowModalShare(true)}
          style={{ width: '36px', height: '36px' }}>
          <KTSVG path='/media/icons/custom/link_white.svg' width={17} height={10} className='m-0' />
        </button>
      </div>
      <ModalShare
        show={showModalShare}
        setShow={setShowModalShare}
        sharingToken={shareURL}
        isLoading={shareIsLoading}
      />
      <ModalViewPDF
        show={showModalViewPDF}
        setShow={setShowModalViewPDF}
        state={{ CERT_FILE_NAME, NAME, USER_ID }}
      />
    </>
  )
}

export default Index

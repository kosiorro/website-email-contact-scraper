import Api from './api'
import { wrapAxiosErrors } from '../components/AxiosErrorHoc'
import Links from './data/links'

function wrapInProps(config: any) {
  return { props: config }
}

function authHeaders(ctx: any) {
  const cookie = ctx?.req?.headers?.cookie
  return cookie ? { Cookie: cookie } : undefined
}

export const homeServerSideProps = wrapAxiosErrors(async () => {
  const config = await Api.getApiConfig()
  return wrapInProps(config)
})

export const outputServerSideProps = wrapAxiosErrors(async (ctx) => {
  const headers = authHeaders(ctx)
  try {
    const [tasks, config] = await Promise.all([
      Api.getTasksForUiDisplay(1, headers),
      Api.getApiConfig(),
    ])
    return { props: { ...config, tasks: tasks.data } }
  } catch (error) {
    if (error?.response?.status === 401) {
      return { redirect: { destination: '/login', permanent: false } }
    }
    throw error
  }
})

export const outputTaskServerSideProps = wrapAxiosErrors(async (ctx: any) => {
  try {
    const id = ctx.params.taskId
    const config = await Api.getApiConfig()
    const { data } = await Api.getUiTaskResults(
      id,
      { per_page: 25, page: 1 },
      true,
      undefined,
      authHeaders(ctx)
    )

    return { props: { ...config, response: data, taskId: id } }
  } catch (error) {
    if (error?.response?.status === 401) {
      return { redirect: { destination: '/login', permanent: false } }
    }
    if (error?.response?.status === 404) {
      return { redirect: { destination: Links.notFound, permanent: false } }
    }
    throw error
  }
})

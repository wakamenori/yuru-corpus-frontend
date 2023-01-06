import NextHead from 'next/head'

type Props = {
  title: string
  description: string
}

export const Head = ({ title, description }: Props) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name='description' content={description}></meta>
      <meta charSet='utf-8' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content={title} />
      <meta name='viewport' content='width=device-width,initial-scale=1.0,minimum-scale=1.0' />
      <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
      <link rel='manifest' href='/favicons/site.webmanifest' />
      <link rel='mask-icon' href='/favicons/safari-pinned-tab.svg' color='#000000' />
      <link rel='shortcut icon' href='/favicons/favicon.ico' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-config' content='/favicons/browserconfig.xml' />{' '}
      <meta name='theme-color' content='#ffffff' />
    </NextHead>
  )
}

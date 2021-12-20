import Alert from "./alert"
import Footer from "./footer"
import Meta from "./meta"

type Props = {
  appName: string
  appImgUrl: string
  preview?: boolean
  children: React.ReactNode
}

function Layout({ appName, appImgUrl, preview, children }: Props) {
  return (
    <>
      <Meta appName={appName} appImgUrl={appImgUrl} />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout

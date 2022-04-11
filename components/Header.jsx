/* eslint-disable @next/next/link-passhref */
import Link from "next/link"

export default function Header() {
    return (
        <div className="header-container">
            <div className="header-head">
                <Link href="/"><h1>lyriks</h1></Link>
                <p>yet another simple & RESTful lyrics API</p>
            </div>
            <div className="header-body">
                <samp>
                    <p>
                        <Link href="/guide">guide</Link>.
                        <a href="https://github.com/asheeeshh/lyriks">github</a>.
                        <a href="">discord</a>
                    </p>
                </samp>
            </div>
        </div>
    )
}
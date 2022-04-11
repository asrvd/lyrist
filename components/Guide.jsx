import { CopyBlock, dracula, CodeBlock, ocean } from "react-code-blocks";
import { Text } from "@chakra-ui/react";

export default function Guide() {
    const text = "await fetch('https://lyriks.vercel.app/api/fumes/eden').then(\n\tres => {\n\tif (res.status === 200) {\n\t\tconsole.log(res.json()\n\t} else {\n\t\tconsole.log('Not Found)\n\t}\n)";
    return (
        <div className="guide-container">
            <h2>API EndPoint</h2>
            <CodeBlock
                text={'/api/:track/:artist'}
                language={'javascript'}
                showLineNumbers={false}
                wrapLines={true}
                theme={ocean}
            />
            <h2>Sample Code</h2>
            <CopyBlock
                className="guide-code"
                text={text}
                language="javascript"
                showLineNumbers={false}
                wrapLines={true}
                theme={ocean}
            />
        </div>
    )
}
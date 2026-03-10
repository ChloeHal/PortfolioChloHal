import { useState } from "react";
import { Code2, Eye } from "lucide-react";

interface CodePreviewProps {
  title: string;
  description?: string;
  code: string;
  preview: React.ReactNode;
  language?: string;
}

const CodePreview: React.FC<CodePreviewProps> = ({
  title,
  description,
  code,
  preview,
  language = "tsx",
}) => {
  const [activeView, setActiveView] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-preview-card">
      <div className="code-preview-header">
        <div>
          <h3 className="code-preview-title">{title}</h3>
          {description && <p className="code-preview-desc">{description}</p>}
        </div>
        <div className="code-preview-tabs" role="tablist">
          <button
            className={`code-preview-tab ${activeView === "preview" ? "active" : ""}`}
            onClick={() => setActiveView("preview")}
            role="tab"
            aria-selected={activeView === "preview"}
          >
            <Eye size={14} />
            Preview
          </button>
          <button
            className={`code-preview-tab ${activeView === "code" ? "active" : ""}`}
            onClick={() => setActiveView("code")}
            role="tab"
            aria-selected={activeView === "code"}
          >
            <Code2 size={14} />
            Code
          </button>
        </div>
      </div>

      <div className="code-preview-body">
        {activeView === "preview" ? (
          <div className="code-preview-render">{preview}</div>
        ) : (
          <div className="code-preview-source">
            <button className="code-copy-btn" onClick={handleCopy}>
              {copied ? "Copié !" : "Copier"}
            </button>
            <pre>
              <code className={`language-${language}`}>{code}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodePreview;

import React from'react';
import './index.css';
export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="global-footer">
      <div>© {currentYear} Made with love</div>
      <div>
        <a
          href="https://github.com/yupiik/yupiik-batch-scheduler"
          target="_blank"
        >
          作者：god
        </a>
      </div>
    </div>
  );
}

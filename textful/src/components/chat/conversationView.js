import React from "react";

const conversationView = () => (
  <div id="conversation">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <button type="button" id="sidebarCollapse" class="btn btn-info">
          <i class="fas fa-align-left"></i>
          <span>Toggle Sidebar</span>
        </button>
      </div>
    </nav>
  </div>
);

export default conversationView;
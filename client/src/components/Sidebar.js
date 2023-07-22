import React from "react";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div>
      <div class="sidebar">
        <i class="fab fa-twitter"></i>

        <div class="sidebarOptions active">
          <span class="material-symbols-outlined"> home </span>
          <h2>Home</h2>
        </div>

        <div class="sidebarOptions">
          <span class="material-symbols-outlined"> tag </span>
          <h2>Explore</h2>
        </div>

        <div class="sidebarOptions">
          <span class="material-symbols-outlined"> notifications </span>
          <h2>Notifications</h2>
        </div>

        <div class="sidebarOptions">
          <span class="material-symbols-outlined"> mail </span>
          <h2>Messages</h2>
        </div>

        <div class="sidebarOptions">
          <span class="material-symbols-outlined"> bookmark </span>
          <h2>Bookmarks</h2>
        </div>

        <div class="sidebarOptions">
          <span class="material-symbols-outlined"> list_alt </span>
          <h2>Lists</h2>
        </div>

        <div class="sidebarOptions">
          <span class="material-symbols-outlined"> person </span>
          <h2>Profile</h2>
        </div>

        <div class="sidebarOptions">
          <span class="material-symbols-outlined"> more_horiz </span>
          <h2>More</h2>
        </div>

        <button class="sidebar__tweet">Tweet</button>

        <div class="empty">
          <span class="material-symbols-outlined"> </span>
        </div>

        <div class="empty">
          <span class="material-symbols-outlined"> </span>
        </div>

        <div class="empty">
          <span class="material-symbols-outlined"> </span>
        </div>

        <div class="empty">
          <span class="material-symbols-outlined"></span>
        </div>

        <div class="sidebarOptions a">
          <span class="material-symbols-outlined">
            {" "}
            radio_button_unchecked{" "}
          </span>
          <h2>liki liki</h2>
          <span class="material-symbols-outlined"> more_horiz </span>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

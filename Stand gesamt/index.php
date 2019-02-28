<?php
    include 'start.php';
    if($_SERVER['REQUEST_URI'] == '/ITP/index.php'){
        include 'login.php';
    }else{
        if($_SERVER['REQUEST_URI'] == '/ITP/index.php?=home'){
            include 'home.php';
        }else{
            if($_SERVER['REQUEST_URI'] == '/ITP/index.php?=add'){
                include 'add.php';
            }else{
                if($_SERVER['REQUEST_URI'] == '/ITP/index.php?=settings'){
                    include 'settings.php';
                }else{
                    if($_SERVER['REQUEST_URI'] == '/ITP/index.php?=groups'){
                        include 'groups.php';
                    }else{
                        if($_SERVER['REQUEST_URI'] == '/ITP/index.php?=gedit'){
                            include 'gedit.php';
                        }else{
                            if($_SERVER['REQUEST_URI'] == '/ITP/index.php?=gnew'){
                                include 'gnew.php';
                            }else{
                                if($_SERVER['REQUEST_URI'] == '/ITP/index.php?=for'){
                                    include 'for.php';
                                }else{
                                    if($_SERVER['REQUEST_URI'] == '/ITP/index.php?=register'){
                                        include 'register.php';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    include 'footer.php';

?>
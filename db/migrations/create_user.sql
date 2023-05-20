

use 'financetracker01'
CREATE TABLE `userlogin` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(100) NOT NULL,
  `user_password` varchar(100) NOT NULL,
  `user_session_id` varchar(100) NOT NULL,
  PRIMARY KEY(user_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`user_id`, `user_email`, `user_password`, `user_session_id`) VALUES
(1, 'tausif2606@gmail.com', 'password', ''),




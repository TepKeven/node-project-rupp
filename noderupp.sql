-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 06, 2023 at 11:26 AM
-- Server version: 10.4.13-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `noderupp`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL DEFAULT 0,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `company` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `postcode` varchar(10) DEFAULT NULL,
  `country_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `address`
--

INSERT INTO `address` (`address_id`, `customer_id`, `first_name`, `last_name`, `company`, `address`, `city`, `postcode`, `country_id`, `createdAt`, `updatedAt`) VALUES
(2, 2, 'Keven', 'Tep', 'RUPP', 'Phnom Penh', 'Phnom Penh', '11000', 1, '2023-01-27 07:12:08', '2023-01-27 07:12:08'),
(3, 3, 'Keven', 'Tep', 'Ke', 'Phnom Penh', 'Phnom Penh', '11000', 1, '2023-01-27 07:14:41', '2023-01-27 07:14:41'),
(4, 3, 'Keven', 'Shop', 'IFL', 'Phnom Penh', 'Phnom Penh', '11000', 1, '2023-01-27 07:14:41', '2023-01-27 07:14:41');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `top` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `image`, `parent_id`, `top`, `sort_order`, `status`, `createdAt`, `updatedAt`) VALUES
(1, '1674456426040.png', 0, 1, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, '1674377915060.png', 0, 1, 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `category_description`
--

CREATE TABLE `category_description` (
  `category_description_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `meta_title` varchar(255) NOT NULL,
  `meta_description` varchar(255) NOT NULL,
  `meta_keyword` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `category_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `category_description`
--

INSERT INTO `category_description` (`category_description_id`, `language_id`, `name`, `description`, `meta_title`, `meta_description`, `meta_keyword`, `createdAt`, `updatedAt`, `category_id`) VALUES
(13, 1, 'Category 1', 'Category 1', 'Category 1', 'Category 1', 'Category 1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(14, 2, 'Category 1', 'Category 1', 'Category 1', 'Category 1', 'Category 1', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 1),
(15, 1, 'Category 2', 'Category 2', 'Category 2', 'Category 2', 'Category 2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2),
(16, 1, 'Category 2', 'Category 2', 'Category 2', 'Category 2', 'Category 2', '0000-00-00 00:00:00', '0000-00-00 00:00:00', 2);

-- --------------------------------------------------------

--
-- Table structure for table `country`
--

CREATE TABLE `country` (
  `country_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `iso_code_2` varchar(2) NOT NULL,
  `iso_code_3` varchar(3) NOT NULL,
  `postcode_required` tinyint(1) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `country`
--

INSERT INTO `country` (`country_id`, `name`, `iso_code_2`, `iso_code_3`, `postcode_required`, `status`, `sort_order`, `createdAt`, `updatedAt`) VALUES
(1, 'Afghanistan', 'AF', 'AFG', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Albania', 'AL', 'ALB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Algeria', 'DZ', 'DZA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'American Samoa', 'AS', 'ASM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Andorra', 'AD', 'AND', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Angola', 'AO', 'AGO', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Anguilla', 'AI', 'AIA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Antarctica', 'AQ', 'ATA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'Antigua and Barbuda', 'AG', 'ATG', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Argentina', 'AR', 'ARG', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'Armenia', 'AM', 'ARM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'Aruba', 'AW', 'ABW', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'Australia', 'AU', 'AUS', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'Austria', 'AT', 'AUT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'Azerbaijan', 'AZ', 'AZE', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'Bahamas', 'BS', 'BHS', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'Bahrain', 'BH', 'BHR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Bangladesh', 'BD', 'BGD', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'Barbados', 'BB', 'BRB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'Belarus', 'BY', 'BLR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'Belgium', 'BE', 'BEL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'Belize', 'BZ', 'BLZ', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'Benin', 'BJ', 'BEN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(24, 'Bermuda', 'BM', 'BMU', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(25, 'Bhutan', 'BT', 'BTN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(26, 'Bolivia', 'BO', 'BOL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(27, 'Bosnia and Herzegovina', 'BA', 'BIH', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(28, 'Botswana', 'BW', 'BWA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(29, 'Bouvet Island', 'BV', 'BVT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(30, 'Brazil', 'BR', 'BRA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(31, 'British Indian Ocean Territory', 'IO', 'IOT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(32, 'Brunei Darussalam', 'BN', 'BRN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(33, 'Bulgaria', 'BG', 'BGR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(34, 'Burkina Faso', 'BF', 'BFA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(35, 'Burundi', 'BI', 'BDI', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(36, 'Cambodia', 'KH', 'KHM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(37, 'Cameroon', 'CM', 'CMR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(38, 'Canada', 'CA', 'CAN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(39, 'Cape Verde', 'CV', 'CPV', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(40, 'Cayman Islands', 'KY', 'CYM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(41, 'Central African Republic', 'CF', 'CAF', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(42, 'Chad', 'TD', 'TCD', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(43, 'Chile', 'CL', 'CHL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(44, 'China', 'CN', 'CHN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(45, 'Christmas Island', 'CX', 'CXR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(46, 'Cocos (Keeling) Islands', 'CC', 'CCK', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(47, 'Colombia', 'CO', 'COL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(48, 'Comoros', 'KM', 'COM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(49, 'Congo', 'CG', 'COG', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(50, 'Cook Islands', 'CK', 'COK', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(51, 'Costa Rica', 'CR', 'CRI', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(52, 'Cote D\'Ivoire', 'CI', 'CIV', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(53, 'Croatia', 'HR', 'HRV', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(54, 'Cuba', 'CU', 'CUB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(55, 'Cyprus', 'CY', 'CYP', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(56, 'Czech Republic', 'CZ', 'CZE', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(57, 'Denmark', 'DK', 'DNK', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(58, 'Djibouti', 'DJ', 'DJI', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(59, 'Dominica', 'DM', 'DMA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(60, 'Dominican Republic', 'DO', 'DOM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(61, 'East Timor', 'TL', 'TLS', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(62, 'Ecuador', 'EC', 'ECU', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(63, 'Egypt', 'EG', 'EGY', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(64, 'El Salvador', 'SV', 'SLV', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(65, 'Equatorial Guinea', 'GQ', 'GNQ', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(66, 'Eritrea', 'ER', 'ERI', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(67, 'Estonia', 'EE', 'EST', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(68, 'Ethiopia', 'ET', 'ETH', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(69, 'Falkland Islands (Malvinas)', 'FK', 'FLK', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(70, 'Faroe Islands', 'FO', 'FRO', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(71, 'Fiji', 'FJ', 'FJI', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(72, 'Finland', 'FI', 'FIN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(73, 'France, Metropolitan', 'FR', 'FRA', 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(74, 'French Guiana', 'GF', 'GUF', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(75, 'French Polynesia', 'PF', 'PYF', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(76, 'French Southern Territories', 'TF', 'ATF', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(77, 'Gabon', 'GA', 'GAB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(78, 'Gambia', 'GM', 'GMB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(79, 'Georgia', 'GE', 'GEO', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(80, 'Germany', 'DE', 'DEU', 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(81, 'Ghana', 'GH', 'GHA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(82, 'Gibraltar', 'GI', 'GIB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(83, 'Greece', 'GR', 'GRC', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(84, 'Greenland', 'GL', 'GRL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(85, 'Grenada', 'GD', 'GRD', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(86, 'Guadeloupe', 'GP', 'GLP', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(87, 'Guam', 'GU', 'GUM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(88, 'Guatemala', 'GT', 'GTM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(89, 'Guinea', 'GN', 'GIN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(90, 'Guinea-Bissau', 'GW', 'GNB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(91, 'Guyana', 'GY', 'GUY', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(92, 'Haiti', 'HT', 'HTI', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(93, 'Heard and Mc Donald Islands', 'HM', 'HMD', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(94, 'Honduras', 'HN', 'HND', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(95, 'Hong Kong', 'HK', 'HKG', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(96, 'Hungary', 'HU', 'HUN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(97, 'Iceland', 'IS', 'ISL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(98, 'India', 'IN', 'IND', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(99, 'Indonesia', 'ID', 'IDN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(100, 'Iran (Islamic Republic of)', 'IR', 'IRN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(101, 'Iraq', 'IQ', 'IRQ', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(102, 'Ireland', 'IE', 'IRL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(103, 'Israel', 'IL', 'ISR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(104, 'Italy', 'IT', 'ITA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(105, 'Jamaica', 'JM', 'JAM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(106, 'Japan', 'JP', 'JPN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(107, 'Jordan', 'JO', 'JOR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(108, 'Kazakhstan', 'KZ', 'KAZ', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(109, 'Kenya', 'KE', 'KEN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(110, 'Kiribati', 'KI', 'KIR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(111, 'North Korea', 'KP', 'PRK', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(112, 'South Korea', 'KR', 'KOR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(113, 'Kuwait', 'KW', 'KWT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(114, 'Kyrgyzstan', 'KG', 'KGZ', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(115, 'Lao People\'s Democratic Republic', 'LA', 'LAO', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(116, 'Latvia', 'LV', 'LVA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(117, 'Lebanon', 'LB', 'LBN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(118, 'Lesotho', 'LS', 'LSO', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(119, 'Liberia', 'LR', 'LBR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(120, 'Libyan Arab Jamahiriya', 'LY', 'LBY', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(121, 'Liechtenstein', 'LI', 'LIE', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(122, 'Lithuania', 'LT', 'LTU', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(123, 'Luxembourg', 'LU', 'LUX', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(124, 'Macau', 'MO', 'MAC', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(125, 'FYROM', 'MK', 'MKD', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(126, 'Madagascar', 'MG', 'MDG', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(127, 'Malawi', 'MW', 'MWI', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(128, 'Malaysia', 'MY', 'MYS', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(129, 'Maldives', 'MV', 'MDV', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(130, 'Mali', 'ML', 'MLI', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(131, 'Malta', 'MT', 'MLT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(132, 'Marshall Islands', 'MH', 'MHL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(133, 'Martinique', 'MQ', 'MTQ', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(134, 'Mauritania', 'MR', 'MRT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(135, 'Mauritius', 'MU', 'MUS', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(136, 'Mayotte', 'YT', 'MYT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(137, 'Mexico', 'MX', 'MEX', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(138, 'Micronesia, Federated States of', 'FM', 'FSM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(139, 'Moldova, Republic of', 'MD', 'MDA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(140, 'Monaco', 'MC', 'MCO', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(141, 'Mongolia', 'MN', 'MNG', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(142, 'Montserrat', 'MS', 'MSR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(143, 'Morocco', 'MA', 'MAR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(144, 'Mozambique', 'MZ', 'MOZ', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(145, 'Myanmar', 'MM', 'MMR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(146, 'Namibia', 'NA', 'NAM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(147, 'Nauru', 'NR', 'NRU', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(148, 'Nepal', 'NP', 'NPL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(149, 'Netherlands', 'NL', 'NLD', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(150, 'Netherlands Antilles', 'AN', 'ANT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(151, 'New Caledonia', 'NC', 'NCL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(152, 'New Zealand', 'NZ', 'NZL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(153, 'Nicaragua', 'NI', 'NIC', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(154, 'Niger', 'NE', 'NER', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(155, 'Nigeria', 'NG', 'NGA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(156, 'Niue', 'NU', 'NIU', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(157, 'Norfolk Island', 'NF', 'NFK', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(158, 'Northern Mariana Islands', 'MP', 'MNP', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(159, 'Norway', 'NO', 'NOR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(160, 'Oman', 'OM', 'OMN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(161, 'Pakistan', 'PK', 'PAK', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(162, 'Palau', 'PW', 'PLW', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(163, 'Panama', 'PA', 'PAN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(164, 'Papua New Guinea', 'PG', 'PNG', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(165, 'Paraguay', 'PY', 'PRY', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(166, 'Peru', 'PE', 'PER', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(167, 'Philippines', 'PH', 'PHL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(168, 'Pitcairn', 'PN', 'PCN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(169, 'Poland', 'PL', 'POL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(170, 'Portugal', 'PT', 'PRT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(171, 'Puerto Rico', 'PR', 'PRI', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(172, 'Qatar', 'QA', 'QAT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(173, 'Reunion', 'RE', 'REU', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(174, 'Romania', 'RO', 'ROM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(175, 'Russian Federation', 'RU', 'RUS', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(176, 'Rwanda', 'RW', 'RWA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(177, 'Saint Kitts and Nevis', 'KN', 'KNA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(178, 'Saint Lucia', 'LC', 'LCA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(179, 'Saint Vincent and the Grenadines', 'VC', 'VCT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(180, 'Samoa', 'WS', 'WSM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(181, 'San Marino', 'SM', 'SMR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(182, 'Sao Tome and Principe', 'ST', 'STP', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(183, 'Saudi Arabia', 'SA', 'SAU', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(184, 'Senegal', 'SN', 'SEN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(185, 'Seychelles', 'SC', 'SYC', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(186, 'Sierra Leone', 'SL', 'SLE', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(187, 'Singapore', 'SG', 'SGP', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(188, 'Slovak Republic', 'SK', 'SVK', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(189, 'Slovenia', 'SI', 'SVN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(190, 'Solomon Islands', 'SB', 'SLB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(191, 'Somalia', 'SO', 'SOM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(192, 'South Africa', 'ZA', 'ZAF', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(193, 'South Georgia &amp; South Sandwich Islands', 'GS', 'SGS', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(194, 'Spain', 'ES', 'ESP', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(195, 'Sri Lanka', 'LK', 'LKA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(196, 'St. Helena', 'SH', 'SHN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(197, 'St. Pierre and Miquelon', 'PM', 'SPM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(198, 'Sudan', 'SD', 'SDN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(199, 'Suriname', 'SR', 'SUR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(200, 'Svalbard and Jan Mayen Islands', 'SJ', 'SJM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(201, 'Swaziland', 'SZ', 'SWZ', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(202, 'Sweden', 'SE', 'SWE', 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(203, 'Switzerland', 'CH', 'CHE', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(204, 'Syrian Arab Republic', 'SY', 'SYR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(205, 'Taiwan', 'TW', 'TWN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(206, 'Tajikistan', 'TJ', 'TJK', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(207, 'Tanzania, United Republic of', 'TZ', 'TZA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(208, 'Thailand', 'TH', 'THA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(209, 'Togo', 'TG', 'TGO', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(210, 'Tokelau', 'TK', 'TKL', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(211, 'Tonga', 'TO', 'TON', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(212, 'Trinidad and Tobago', 'TT', 'TTO', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(213, 'Tunisia', 'TN', 'TUN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(214, 'Turkey', 'TR', 'TUR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(215, 'Turkmenistan', 'TM', 'TKM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(216, 'Turks and Caicos Islands', 'TC', 'TCA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(217, 'Tuvalu', 'TV', 'TUV', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(218, 'Uganda', 'UG', 'UGA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(219, 'Ukraine', 'UA', 'UKR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(220, 'United Arab Emirates', 'AE', 'ARE', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(221, 'United Kingdom', 'GB', 'GBR', 1, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(222, 'United States', 'US', 'USA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(223, 'United States Minor Outlying Islands', 'UM', 'UMI', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(224, 'Uruguay', 'UY', 'URY', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(225, 'Uzbekistan', 'UZ', 'UZB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(226, 'Vanuatu', 'VU', 'VUT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(227, 'Vatican City State (Holy See)', 'VA', 'VAT', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(228, 'Venezuela', 'VE', 'VEN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(229, 'Viet Nam', 'VN', 'VNM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(230, 'Virgin Islands (British)', 'VG', 'VGB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(231, 'Virgin Islands (U.S.)', 'VI', 'VIR', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(232, 'Wallis and Futuna Islands', 'WF', 'WLF', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(233, 'Western Sahara', 'EH', 'ESH', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(234, 'Yemen', 'YE', 'YEM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(235, 'Democratic Republic of Congo', 'CD', 'COD', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(236, 'Zambia', 'ZM', 'ZMB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(237, 'Zimbabwe', 'ZW', 'ZWE', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(238, 'Montenegro', 'ME', 'MNE', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(239, 'Serbia', 'RS', 'SRB', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(240, 'Aaland Islands', 'AX', 'ALA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(241, 'Bonaire, Sint Eustatius and Saba', 'BQ', 'BES', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(242, 'Curacao', 'CW', 'CUW', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(243, 'Palestinian Territory, Occupied', 'PS', 'PSE', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(244, 'South Sudan', 'SS', 'SSD', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(245, 'St. Barthelemy', 'BL', 'BLM', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(246, 'St. Martin (French part)', 'MF', 'MAF', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(247, 'Canary Islands', 'IC', 'ICA', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(248, 'Ascension Island (British)', 'AC', 'ASC', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(249, 'Kosovo, Republic of', 'XK', 'UNK', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(250, 'Isle of Man', 'IM', 'IMN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(251, 'Tristan da Cunha', 'TA', 'SHN', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(252, 'Guernsey', 'GG', 'GGY', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(253, 'Jersey', 'JE', 'JEY', 0, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `currency_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(3) NOT NULL,
  `symbol_left` varchar(255) DEFAULT NULL,
  `symbol_right` varchar(255) DEFAULT NULL,
  `decimal_place` char(1) NOT NULL DEFAULT '2',
  `value_from_usd` double(15,8) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`currency_id`, `name`, `code`, `symbol_left`, `symbol_right`, `decimal_place`, `value_from_usd`, `status`, `sort_order`, `createdAt`, `updatedAt`) VALUES
(1, 'US Dollar', 'USD', '$', '', '2', 1.00000000, 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Riel', 'R', '៛', '', '2', 4000.00000000, 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `customer_group_id` int(11) NOT NULL DEFAULT 1,
  `store_id` int(11) NOT NULL DEFAULT 1,
  `language_id` int(11) NOT NULL DEFAULT 1,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `email` varchar(96) NOT NULL,
  `telephone` varchar(32) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(10) NOT NULL DEFAULT '12345',
  `cart` varchar(255) DEFAULT NULL,
  `wishlist` varchar(255) DEFAULT NULL,
  `newsletter` int(1) NOT NULL DEFAULT 1,
  `address_id` int(11) NOT NULL DEFAULT 0,
  `ip` varchar(100) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `customer_group_id`, `store_id`, `language_id`, `first_name`, `last_name`, `email`, `telephone`, `image`, `password`, `salt`, `cart`, `wishlist`, `newsletter`, `address_id`, `ip`, `status`, `createdAt`, `updatedAt`) VALUES
(2, 1, 1, 1, 'Keven', 'Tep', 'teapkevin@gmail.com', '1234567', '1674803528344.jpg', '$2b$10$nOuq6ytP.xhGv.sUJalxiuoNN8/Ju9MvdKrnveBvna/9CeDk3HC5O', '$2b$10$nOu', NULL, NULL, 0, 0, '::1', 1, '2023-01-27 07:12:08', '2023-01-27 07:12:08'),
(3, 1, 1, 1, 'Keven', 'Tep', 'teapkevin@gmail.com', '1234567', '1674803681059.png', '$2b$10$LFg7MM8Fw4DKPsjhmgLTLes1Q0qzmT9377qm2Bga.oo4mbyjpTY8u', '$2b$10$LFg', NULL, NULL, 1, 0, '::1', 1, '2023-01-27 07:14:41', '2023-01-27 07:14:41');

-- --------------------------------------------------------

--
-- Table structure for table `customer_group`
--

CREATE TABLE `customer_group` (
  `customer_group_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL DEFAULT '',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_group`
--

INSERT INTO `customer_group` (`customer_group_id`, `name`, `description`, `sort_order`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Default', 'Default', 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `dashboard_item`
--

CREATE TABLE `dashboard_item` (
  `dashboard_item_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `href` varchar(255) NOT NULL DEFAULT '#',
  `icon` varchar(255) NOT NULL DEFAULT 'fas fa-pen',
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `dashboard_item`
--

INSERT INTO `dashboard_item` (`dashboard_item_id`, `name`, `href`, `icon`, `sort_order`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Dashboard', '/admin/dashboard', 'bi bi-bar-chart-fill', 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Category', '/admin/category', 'bi bi-box-fill', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Products', '/admin/product', 'bi bi-tags-fill', 2, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Orders', '/admin/order', 'bi bi-credit-card-2-back', 3, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Customers', '/admin/customer', 'bi bi-person-circle', 4, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Users', '/admin/user', 'bi bi-person-fill-check', 5, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'User Roles', '/admin/userrole', 'fas fa-crown', 6, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Slideshow', '/admin/slideshow', 'bi bi-person-fill-check', 7, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `manufacturer`
--

CREATE TABLE `manufacturer` (
  `manufacturer_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'N/A',
  `image` varchar(255) DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `manufacturer`
--

INSERT INTO `manufacturer` (`manufacturer_id`, `name`, `image`, `sort_order`, `createdAt`, `updatedAt`) VALUES
(1, 'HTC', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Palm', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Apple', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Sony', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Canon', '', 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `invoice_no` int(11) NOT NULL DEFAULT 0,
  `invoice_prefix` varchar(30) NOT NULL DEFAULT 'INV-2023-00',
  `store_id` int(11) NOT NULL DEFAULT 1,
  `store_name` varchar(100) NOT NULL DEFAULT 'RUPP Project',
  `customer_id` int(11) DEFAULT 0,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `company` varchar(60) NOT NULL,
  `address` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `country_id` int(11) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `shipping_id` int(11) NOT NULL,
  `total` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `order_status_id` int(11) NOT NULL DEFAULT 1,
  `tracking` varchar(255) NOT NULL DEFAULT '',
  `language_id` int(11) NOT NULL DEFAULT 1,
  `currency_id` int(11) NOT NULL DEFAULT 1,
  `ip` varchar(100) NOT NULL,
  `payslip` varchar(300) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `invoice_no`, `invoice_prefix`, `store_id`, `store_name`, `customer_id`, `first_name`, `last_name`, `email`, `telephone`, `company`, `address`, `city`, `country`, `country_id`, `payment_id`, `shipping_id`, `total`, `order_status_id`, `tracking`, `language_id`, `currency_id`, `ip`, `payslip`, `createdAt`, `updatedAt`) VALUES
(2, 0, 'INV-2023-1-29-Keven', 1, 'RUPP Project', 2, 'Keven', 'Tep', 'teapkevin@gmail.com', '1234567', 'IFL', 'Phnom Penh', 'Phnom Penh', 'Cambodia', 36, 1, 2, '600.0000', 8, '', 1, 1, '::1', '', '2023-01-29 02:34:39', '2023-01-29 02:34:39'),
(3, 0, 'INV-2023-1-29-Keven', 1, 'RUPP Project', 2, 'Keven', 'Tep', 'teapkevin@gmail.com', '1234567', 'IFL', 'Phnom Penh', 'Phnom Penh', 'Burundi', 35, 1, 2, '600.0000', 8, '', 1, 1, '::1', '', '2023-01-02 17:42:20', '2023-02-02 17:42:36'),
(4, 1, 'INV-2023-1-29-Keven', 1, 'RUPP Project', 2, 'Keven', 'Tep', 'teapkevin@gmail.com', '1234567', 'IFL', 'Phnom Penh', 'Phnom Penh', 'Burundi', 35, 1, 2, '600.0000', 8, '', 1, 1, '::1', '', '2023-03-03 18:06:25', '2023-01-03 17:42:36'),
(5, 1, 'INV-2023-1-29-Keven', 1, 'RUPP Project', 2, 'Keven', 'Tep', 'teapkevin@gmail.com', '1234567', 'IFL', 'Phnom Penh', 'Phnom Penh', 'Burundi', 35, 1, 2, '600.0000', 8, '', 1, 1, '::1', '', '2023-03-03 18:06:25', '2023-01-03 17:42:36');

-- --------------------------------------------------------

--
-- Table structure for table `order_product`
--

CREATE TABLE `order_product` (
  `order_product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `model` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `total` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `tax` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_product`
--

INSERT INTO `order_product` (`order_product_id`, `order_id`, `product_id`, `name`, `model`, `quantity`, `price`, `total`, `tax`, `createdAt`, `updatedAt`) VALUES
(4, 2, 4, 'Product', 'Product', 2, '250.0000', '600.0000', '50.0000', '2023-01-29 02:34:39', '2023-01-29 02:34:39');

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`order_status_id`, `name`, `status`, `sort_order`, `createdAt`, `updatedAt`) VALUES
(1, 'Processing', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Shipped', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Cancelled', 1, 2, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Complete', 1, 3, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Denied', 1, 4, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Failed', 1, 5, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Refunded', 1, 6, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Pending', 1, 7, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'Processed', 1, 8, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Expired', 1, 9, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `code`, `name`, `status`, `sort_order`, `createdAt`, `updatedAt`) VALUES
(1, 'COD', 'Cash on Delivery', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'BT', 'Bank Transfer', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `model` varchar(100) NOT NULL,
  `quantity` int(10) NOT NULL,
  `stock_status_id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `manufacturer_id` int(11) DEFAULT NULL,
  `price` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `tax_class_id` int(11) DEFAULT NULL,
  `subtract` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `viewed` int(10) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `model`, `quantity`, `stock_status_id`, `image`, `manufacturer_id`, `price`, `tax_class_id`, `subtract`, `sort_order`, `status`, `viewed`, `createdAt`, `updatedAt`) VALUES
(4, 'Product', 200, 1, '1674727421358.png', 1, '250.0000', 1, 1, 21, 1, 0, '2023-01-25 09:43:03', '2023-01-26 10:03:41'),
(5, 'Keven', 200, 1, '1674727479250.png', 1, '2450.0000', 1, 1, 21, 1, 0, '2023-01-26 10:04:39', '2023-01-26 10:04:39');

-- --------------------------------------------------------

--
-- Table structure for table `product_description`
--

CREATE TABLE `product_description` (
  `product_description_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `tag` text NOT NULL,
  `meta_title` varchar(255) NOT NULL,
  `meta_description` varchar(255) NOT NULL,
  `meta_keyword` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `product_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_description`
--

INSERT INTO `product_description` (`product_description_id`, `language_id`, `name`, `description`, `tag`, `meta_title`, `meta_description`, `meta_keyword`, `createdAt`, `updatedAt`, `product_id`) VALUES
(5, 1, 'Product', '&lt;p&gt;Product&lt;/p&gt;', '', 'Product', 'Product', 'Product', '2023-01-25 09:43:03', '2023-01-25 09:43:03', 4),
(6, 2, 'Product', '&lt;p&gt;Product&lt;/p&gt;', '', 'Product', 'Product', 'Product', '2023-01-25 09:43:03', '2023-01-25 09:43:03', 4),
(7, 1, 'Keven', '&lt;p&gt;Keven&lt;/p&gt;', '', 'Keven', 'Keven', 'Keven', '2023-01-26 10:04:39', '2023-01-26 10:04:39', 5),
(8, 2, 'Keven', '&lt;p&gt;Keven&lt;/p&gt;', '', 'Keven', 'Keven', 'Keven', '2023-01-26 10:04:39', '2023-01-26 10:04:39', 5);

-- --------------------------------------------------------

--
-- Table structure for table `product_to_category`
--

CREATE TABLE `product_to_category` (
  `product_to_category_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_to_category`
--

INSERT INTO `product_to_category` (`product_to_category_id`, `product_id`, `category_id`, `createdAt`, `updatedAt`) VALUES
(6, 4, 1, '2023-01-26 10:03:41', '2023-01-26 10:03:41'),
(7, 5, 2, '2023-01-26 10:04:39', '2023-01-26 10:04:39'),
(8, 5, 1, '2023-01-26 10:04:39', '2023-01-26 10:04:39');

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `session_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `data` text NOT NULL,
  `is_customer` tinyint(1) NOT NULL DEFAULT 1,
  `token` varchar(255) NOT NULL,
  `expire` timestamp NOT NULL DEFAULT (current_timestamp() + interval 2 hour),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `session`
--

INSERT INTO `session` (`session_id`, `email`, `data`, `is_customer`, `token`, `expire`, `createdAt`, `updatedAt`) VALUES
(6, 'teapkevin@gmail.com', '{\"language\":\"en\",\"currency\":\"USD\",\"user_id\":2}', 0, 'aa8331d36f68e3964db196aab08483d7', '2023-02-05 07:35:04', '2023-02-05 03:45:57', '2023-02-05 05:35:04');

-- --------------------------------------------------------

--
-- Table structure for table `shipment`
--

CREATE TABLE `shipment` (
  `shipping_id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL DEFAULT '',
  `name` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `shipment`
--

INSERT INTO `shipment` (`shipping_id`, `code`, `name`, `status`, `sort_order`, `createdAt`, `updatedAt`) VALUES
(1, 'Flat', 'Flat Shipping', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Free', 'Free Shipping', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `slideshows`
--

CREATE TABLE `slideshows` (
  `slideshow_id` int(11) NOT NULL,
  `language_id` int(11) NOT NULL DEFAULT 1,
  `title` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `link` varchar(255) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `sort_order` int(6) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `stock_status`
--

CREATE TABLE `stock_status` (
  `stock_status_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'N/A',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `stock_status`
--

INSERT INTO `stock_status` (`stock_status_id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'In Stock', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Pre-Order', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Out of Stock', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, '2-3 Days', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'N/A', '2023-01-25 06:54:55', '2023-01-25 06:54:55');

-- --------------------------------------------------------

--
-- Table structure for table `tax_class`
--

CREATE TABLE `tax_class` (
  `tax_class_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL DEFAULT 'N/A',
  `description` varchar(255) NOT NULL DEFAULT '',
  `rate` decimal(15,4) NOT NULL DEFAULT 0.0000,
  `type` char(1) NOT NULL DEFAULT 'P',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tax_class`
--

INSERT INTO `tax_class` (`tax_class_id`, `name`, `description`, `rate`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'Tax with 20%', 'Tax with 20%', '20.0000', 'P', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Tax with 20$', 'Tax with 20$', '20.0000', 'F', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'N/A', '', '0.0000', 'P', '2023-01-25 06:54:55', '2023-01-25 06:54:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_role_id` int(11) NOT NULL DEFAULT 1,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `salt` varchar(100) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `email` varchar(96) NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT '',
  `code` varchar(50) NOT NULL DEFAULT '',
  `ip` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_role_id`, `username`, `password`, `salt`, `first_name`, `last_name`, `email`, `image`, `code`, `ip`, `status`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'Keven Tep', '$2b$10$MqMGGWp/uHOKLXGuQNT0jusACz3R.9ORbHsSmhQQSreTaA8sKYKQq', '$2b$10$MqMGGWp/uHOKLXGuQNT0ju', 'Keven', 'Tep', 'teapkevin@gmail.com', '1675354345336.png', '', '::1', 1, '2023-01-31 08:29:12', '2023-02-02 16:12:25');

-- --------------------------------------------------------

--
-- Table structure for table `user_roles`
--

CREATE TABLE `user_roles` (
  `user_role_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `permission` text NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `status` tinyint(1) NOT NULL DEFAULT 1,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_roles`
--

INSERT INTO `user_roles` (`user_role_id`, `name`, `permission`, `sort_order`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Administrator', '[1,2,3,4,5,6]', 0, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `category_description`
--
ALTER TABLE `category_description`
  ADD PRIMARY KEY (`category_description_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `country`
--
ALTER TABLE `country`
  ADD PRIMARY KEY (`country_id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`currency_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD KEY `customer_group_id` (`customer_group_id`);

--
-- Indexes for table `customer_group`
--
ALTER TABLE `customer_group`
  ADD PRIMARY KEY (`customer_group_id`);

--
-- Indexes for table `dashboard_item`
--
ALTER TABLE `dashboard_item`
  ADD PRIMARY KEY (`dashboard_item_id`);

--
-- Indexes for table `manufacturer`
--
ALTER TABLE `manufacturer`
  ADD PRIMARY KEY (`manufacturer_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `country_id` (`country_id`),
  ADD KEY `payment_id` (`payment_id`),
  ADD KEY `shipping_id` (`shipping_id`),
  ADD KEY `order_status_id` (`order_status_id`),
  ADD KEY `currency_id` (`currency_id`);

--
-- Indexes for table `order_product`
--
ALTER TABLE `order_product`
  ADD PRIMARY KEY (`order_product_id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`order_status_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `stock_status_id` (`stock_status_id`),
  ADD KEY `manufacturer_id` (`manufacturer_id`),
  ADD KEY `tax_class_id` (`tax_class_id`);

--
-- Indexes for table `product_description`
--
ALTER TABLE `product_description`
  ADD PRIMARY KEY (`product_description_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_to_category`
--
ALTER TABLE `product_to_category`
  ADD PRIMARY KEY (`product_to_category_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `shipment`
--
ALTER TABLE `shipment`
  ADD PRIMARY KEY (`shipping_id`);

--
-- Indexes for table `slideshows`
--
ALTER TABLE `slideshows`
  ADD PRIMARY KEY (`slideshow_id`);

--
-- Indexes for table `stock_status`
--
ALTER TABLE `stock_status`
  ADD PRIMARY KEY (`stock_status_id`);

--
-- Indexes for table `tax_class`
--
ALTER TABLE `tax_class`
  ADD PRIMARY KEY (`tax_class_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `user_role_id` (`user_role_id`);

--
-- Indexes for table `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`user_role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `category_description`
--
ALTER TABLE `category_description`
  MODIFY `category_description_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `country`
--
ALTER TABLE `country`
  MODIFY `country_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `currency_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customer_group`
--
ALTER TABLE `customer_group`
  MODIFY `customer_group_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `dashboard_item`
--
ALTER TABLE `dashboard_item`
  MODIFY `dashboard_item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `manufacturer`
--
ALTER TABLE `manufacturer`
  MODIFY `manufacturer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `order_product`
--
ALTER TABLE `order_product`
  MODIFY `order_product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `order_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `product_description`
--
ALTER TABLE `product_description`
  MODIFY `product_description_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `product_to_category`
--
ALTER TABLE `product_to_category`
  MODIFY `product_to_category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `shipment`
--
ALTER TABLE `shipment`
  MODIFY `shipping_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `slideshows`
--
ALTER TABLE `slideshows`
  MODIFY `slideshow_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `stock_status`
--
ALTER TABLE `stock_status`
  MODIFY `stock_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tax_class`
--
ALTER TABLE `tax_class`
  MODIFY `tax_class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `user_role_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `address_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category_description`
--
ALTER TABLE `category_description`
  ADD CONSTRAINT `category_description_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_ibfk_1` FOREIGN KEY (`customer_group_id`) REFERENCES `customer_group` (`customer_group_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`country_id`) REFERENCES `country` (`country_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`shipping_id`) REFERENCES `shipment` (`shipping_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`order_status_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`currency_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_product`
--
ALTER TABLE `order_product`
  ADD CONSTRAINT `order_product_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`stock_status_id`) REFERENCES `stock_status` (`stock_status_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`manufacturer_id`) REFERENCES `manufacturer` (`manufacturer_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `products_ibfk_3` FOREIGN KEY (`tax_class_id`) REFERENCES `tax_class` (`tax_class_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product_description`
--
ALTER TABLE `product_description`
  ADD CONSTRAINT `product_description_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`user_role_id`) REFERENCES `user_roles` (`user_role_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

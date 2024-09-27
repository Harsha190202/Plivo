variable "vpc_cidr" {
  default = "10.10.0.0/16"
  type = string
  description = "Vpc cidr range"
}


variable "public_subnets" {
  default = ["10.10.4.0/24", "10.10.5.0/24", "10.10.6.0/24"]
  type = list(string)
  description = "Public subnet array"
}


variable "private_subnets" {
  default = ["10.10.1.0/24", "10.10.2.0/24", "10.10.3.0/24"]
  type = list(string)
  description = "Public subnet array"
}


variable "vpc_name" {
  default = "Plivo"
  type = string
  description = "Name of the vpc "
}
variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
}

variable "public_subnet_1" {
  description = "CIDR block for the first public subnet"
  type        = string
}

variable "public_subnet_2" {
  description = "CIDR block for the second public subnet"
  type        = string
}

variable "private_subnet_1" {
  description = "CIDR block for the first private subnet"
  type        = string
}

variable "private_subnet_2" {
  description = "CIDR block for the second private subnet"
  type        = string
}
